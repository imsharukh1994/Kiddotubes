$ErrorActionPreference = 'Stop'

$sdkDir = "$env:LOCALAPPDATA\Android\Sdk"
Write-Host "Setting up Android SDK at: $sdkDir"

New-Item -ItemType Directory -Force -Path $sdkDir | Out-Null

$cmdlineToolsDir = "$sdkDir\cmdline-tools\latest"
$sdkManager = "$cmdlineToolsDir\bin\sdkmanager.bat"

if (-not (Test-Path $sdkManager)) {
    $zipPath = "$env:TEMP\cmdline-tools.zip"
    $url = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"
    
    Write-Host "Downloading Google Android Command-Line Tools from $url..."
    Invoke-WebRequest -Uri $url -OutFile $zipPath
    
    Write-Host "Extracting Command-Line Tools..."
    $tempExtract = "$env:TEMP\cmdline-tools-extracted"
    Expand-Archive -Path $zipPath -DestinationPath $tempExtract -Force
    
    New-Item -ItemType Directory -Force -Path $cmdlineToolsDir | Out-Null
    Copy-Item -Path "$tempExtract\cmdline-tools\*" -Destination $cmdlineToolsDir -Recurse -Force
    
    Remove-Item -Path $zipPath -Force -ErrorAction SilentlyContinue
    Remove-Item -Path $tempExtract -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Android Command-Line Tools installed successfully!"
}

# Set JAVA_HOME for sdkmanager
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
if (-not (Test-Path $env:JAVA_HOME)) {
    $env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
}
Write-Host "Using JAVA_HOME: $env:JAVA_HOME"

# Write local.properties for the project
$localPropPath = "D:\Shaharukh_projects\Kiddotubes\android\local.properties"
$escapedSdkDir = $sdkDir -replace '\\', '/'
Set-Content -Path $localPropPath -Value "sdk.dir=$escapedSdkDir"
Write-Host "Updated android/local.properties -> sdk.dir=$escapedSdkDir"

# Install platforms;android-34 and build-tools;34.0.0 using sdkmanager
Write-Host "Installing Android SDK 34 platforms & build-tools (this may take 1-2 minutes)..."
$sdkManagerBin = "$cmdlineToolsDir\bin\sdkmanager.bat"

# Automatically accept licenses
$licensesDir = "$sdkDir\licenses"
New-Item -ItemType Directory -Force -Path $licensesDir | Out-Null
Set-Content -Path "$licensesDir\android-sdk-license" -Value "89339415777144943969b519326d9c6695b36444`n24333f8a63718c15559438b090674c1d0449d709`n504667f4c0d065fe163b45f96752416092a94379"
Set-Content -Path "$licensesDir\android-sdk-preview-license" -Value "84831b9409646a918e30573bab4c9c91346d8abd"

# Run sdkmanager
Start-Process -FilePath $sdkManagerBin -ArgumentList "--sdk_root=$sdkDir", "platforms;android-34", "build-tools;34.0.0" -NoNewWindow -Wait

Write-Host "==================================================="
Write-Host "Android SDK setup complete!"
Write-Host "Now ready to build the APK!"
Write-Host "==================================================="
