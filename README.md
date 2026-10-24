# REA GitHub Actions — Alfa2 ve Cemreefe

Bu public depo yalnizca sentetik bir REA smoke testini calistirir.
Alfa2 ve Cemreefe oyun kaynaklari mevcut PRIVATE depolarinda kalir.
Burada gercek oyun kodu, SQL, APK veya gizli bilgi YOKTUR.

## Calistirma
GitHub: Actions > REA static analysis example > Run workflow
Termux: gh workflow run rea-analysis.yml -R unpacker1/rea-analysis --ref main

Rapor: Actions > ilgili calisma > Artifacts > rea-analysis
Dosyalar: analysis.json, analysis.stderr, exit-code.txt.
Exit code 0, REA komutunun basarili bittigini gosterir; tum analiz
kapsaminin eksiksiz oldugu anlamina gelmez.

## Proje plani
1. REA 6.7.0 + Node 24.22.1 ile public sentetik JS testi.
2. Alfa2: Yalnizca acikca paylasilmasi uygun gorulen JS ornekleriyle
   MessagePack / mob hareket akisinin sinirli incelenmesi.
3. Cemreefe: Native ARM64 analizinde once Ghidra saglayici kurulumunun
   headless ortamda desteklenip desteklenmediginin dogrulanmasi.

## Guvenlik
Private repo, oyun dosyasi, APK, gizli kod, parola, token, SQL veritabani,
HAR veya ozel analiz ciktisi bu public repoya ASLA konulmamalidir.
Public workflow loglari ve artifact dosyalari gizli kabul edilmemelidir.
Tum analiz izin sahibi olunan dosyalar uzerinde yapilmalidir.
Bu is akisi private depolari indirmez veya onlara erismez.

Upstream REA: https://github.com/morluto/rea
Ornek: https://github.com/morluto/rea/blob/main/examples/github-actions/rea-analysis.yml
Rehber: https://github.com/morluto/rea/blob/main/docs/ci-analysis.md
