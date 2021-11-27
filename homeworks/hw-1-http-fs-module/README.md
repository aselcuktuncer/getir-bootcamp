# week-2-assignment

Bu ödevde http ve fs modülleri kullanılarak bir Node.js server'ı yazılmıştır.

 ## http

* Http modülü createServer() metodunu kullanarak bir web server oluşturmamıza olanak sağlar. 

* Request edilen ilgili url'i if-else ya da switch yapısı kullanarak ayrıştırırız ve böylece ilgili url'e örneğin hakkında sayfası için "127.0.0.1/about" adresine bir istekte bulunabiliriz.

* İstemimize writeHead() metoduyla ilgili headerları örneğin 200 status kodu veya Content-Type bilgisini ekleyebilir.

* İstemciye göstereceğimiz mesajı write() metodu ile sayfanın DOM yapısına ekleyebiliriz. Örneğin res.write("You are at INDEX page")

* end() metodu ile isteği sonlandırıp ilgili requeste gönderilecek olan response'u alabiliriz.

* Sunucumuzu listen() metodu ile çalıştırırız. Default olarak 127.0.0.1 IP adresinde 3000. portta çalışır.

## fs

* fs bizim Node.js ortamında dosya işlemleri yapmamıza olanak tanır.

* createWriteStream() metodu ile dosya yazma işlemini başlatabiliriz. Aldığı 2 parametreden ilki dosyanın oluşturulacağı konum, ikincisi ise dosyanın işleneceği biçimdir. Bizim kullandığımız "a" flag'i dosya yoksa yaratmak ve ilgili dosyaya yazmak anlamına gelir.

* write() metodu ile ilgili dosyaya istediğimiz içeriği yazabiliriz.
