$ErrorActionPreference = 'Stop'

$sdkDir = "C:\Users\Shaharukh Mithagari\AppData\Local\Android\Sdk"
$licensesDir = "$sdkDir\licenses"

New-Item -ItemType Directory -Force -Path $licensesDir | Out-Null

$androidSdkLicense = @"
89339415777144943969b519326d9c6695b36444
24333f8a63718c15559438b090674c1d0449d709
504667f4c0d065fe163b45f96752416092a94379
84831b9409646a918e30573bab4c9c91346d8abd
7a1154464452a86b698176e440802e960ed60d37
d976f39169480616e60f86236d99715699f50792
6010077e686726c67019b2e8834521497b3c6425
"@

Set-Content -Path "$licensesDir\android-sdk-license" -Value $androidSdkLicense
Set-Content -Path "$licensesDir\android-sdk-preview-license" -Value "84831b9409646a918e30573bab4c9c91346d8abd"
Set-Content -Path "$licensesDir\android-googletv-license" -Value "6010077e686726c67019b2e8834521497b3c6425"

Write-Host "Created Android SDK licenses."

$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$sdkManager = "$sdkDir\cmdline-tools\latest\bin\sdkmanager.bat"

Write-Host "Installing platforms;android-34 and build-tools;34.0.0..."
& $sdkManager "--sdk_root=$sdkDir" "platforms;android-34" "build-tools;34.0.0"

Write-Host "Installation completed!"
