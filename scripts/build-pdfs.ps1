<#
.SYNOPSIS
    Compila os curriculos LaTeX (resume.tex e resume-en.tex) em PDF usando uma
    imagem Docker com TeX Live completo e copia os artefatos para web/public/.

.DESCRIPTION
    Este script:
      1) Verifica se o Docker esta disponivel.
      2) Garante que a imagem 'texlive/texlive:latest' esta presente
         (faz pull caso nao exista localmente).
      3) Roda xelatex em duas passagens para cada .tex (resolve referencias).
      4) Copia os PDFs gerados para web/public/ (servido pelo botao "Baixar PDF").
      5) Limpa os arquivos auxiliares (.aux, .log, .out, etc.) sem mexer
         nos PDFs finais.

    Pode ser executado quantas vezes for necessario; e idempotente.

.EXAMPLE
    PS> ./scripts/build-pdfs.ps1
#>

[CmdletBinding()]
param(
    # Imagem TeX Live (full) usada para a compilacao.
    [string] $Image = "texlive/texlive:latest"
)

$ErrorActionPreference = "Stop"

# Resolve a raiz do repositorio a partir da localizacao deste script.
$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$WebPublic = Join-Path $RepoRoot "web/public"

Write-Host "[build-pdfs] Raiz do repositorio: $RepoRoot"

# Conferencia rapida do Docker
try {
    docker --version | Out-Null
} catch {
    throw "Docker nao encontrado no PATH. Instale o Docker Desktop e tente novamente."
}

# Garante que a imagem TeX Live esta disponivel localmente
$imageExists = docker images --format "{{.Repository}}:{{.Tag}}" | Select-String -Pattern "^$([regex]::Escape($Image))$" -Quiet
if (-not $imageExists) {
    Write-Host "[build-pdfs] Imagem '$Image' nao encontrada localmente. Baixando..."
    docker pull $Image
}

# Pares (arquivo .tex de entrada -> nome do PDF de saida em web/public/).
$jobs = @(
    @{ Tex = "resume.tex";    Pdf = "resume.pdf"    },
    @{ Tex = "resume-en.tex"; Pdf = "resume-en.pdf" }
)

# Monta o repositorio dentro do container; a saida e gerada em /work/build
# para que arquivos auxiliares fiquem isolados dos fontes versionados.
$mount = "${RepoRoot}:/work"

foreach ($job in $jobs) {
    $tex = $job.Tex
    $pdf = $job.Pdf
    Write-Host "[build-pdfs] Compilando $tex ..."

    # Duas passagens do xelatex resolvem referencias (sumario, hyperref, etc.).
    # -interaction=nonstopmode evita travas em prompts; -halt-on-error
    # interrompe imediatamente se houver erro real de compilacao.
    docker run --rm `
        -v "$mount" `
        -w "/work" `
        $Image `
        sh -c "mkdir -p build && xelatex -interaction=nonstopmode -halt-on-error -output-directory=build $tex && xelatex -interaction=nonstopmode -halt-on-error -output-directory=build $tex"

    if ($LASTEXITCODE -ne 0) {
        throw "Falha ao compilar $tex (xelatex retornou $LASTEXITCODE)."
    }

    # Move o PDF compilado para web/public/, sobrescrevendo a versao anterior.
    $generated = Join-Path $RepoRoot "build/$($tex -replace '\.tex$', '.pdf')"
    $target    = Join-Path $WebPublic $pdf
    Copy-Item -Path $generated -Destination $target -Force
    Write-Host "[build-pdfs] -> $target"
}

# Limpeza dos artefatos auxiliares; mantem os PDFs ja copiados em web/public/.
$buildDir = Join-Path $RepoRoot "build"
if (Test-Path $buildDir) {
    Remove-Item -Recurse -Force $buildDir
}

Write-Host "[build-pdfs] PDFs atualizados em $WebPublic"
