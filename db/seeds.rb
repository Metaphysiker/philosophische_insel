User.create!([
  {email: "admin@gmail.com", encrypted_password: "$2a$12$Qf3NuUtpkwfpX/8CRV0B8.N7.edSTzPIZPR2PdahZSh2ftElcIvh6", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil}
])
DonationProject.create!([
  {title: "Wizard braucht etwas zum Mampfen!", description: " Mit seinen fast 34 Jahren kann Wizard kein Heu mehr fressen. Auch diverse Heuersatz-Produkte tun es nicht mehr.\n                \n\n                Was Wizard noch essen kann, ist getreidefreies Mash.\n                \n\n                Hilf uns, die Kosten für Wizards Futter zu decken! ", amount_needed_total: "10000.0", slug: "wizard-braucht-etwas-zum-mampfen"}
])
Role.create!([
  {name: "admin"}
])
UserRole.create!([
  {user_id: 1, role_id: 1}
])
Medium.create!([
  {paper: "SRF", title: "Veganer Januar - Schon ausprobiert? ", content: "In der Schweiz leben rund 40'000 Menschen vegan. Das heisst, sie ernähren sich von rein pflanzlichen Nahrungsmitteln. Die Beweggründe sind unterschiedlich: Das Tierwohl kann jemanden dazu führen, der Klimaschutz oder beides. Eine Ernährungsgewohnheit, die mit vielen Vorurteilen behaftet ist. ", hyperlink: "Veganer Januar - Schon ausprobiert?", date: "2022-01-17"},
  {paper: "Jungfrau Zeitung", title: "Alter Wein in neuen Schläuchen", content: "Sich rein pflanzlich zu ernähren, ist «in» und wird unter anderem mit dem «Veganuary» propagiert. Dennoch ist die Ernährungsform nicht neu, wie ein Blick in die Geschichte, in die alltägliche Küche und nach Frutigen zeigt.", hyperlink: "https://www.jungfrauzeitung.ch/artikel/196353/", date: "2022-01-12"},
  {paper: "Aargauer Zeitung", title: "Einen ganzen Monat vegan: Wie kommt der «Veganuar» bei den Leuten an?", content: "Einen Monat lang auf Fleisch und weitere Tierprodukte zu verzichten, dürfte dem einen oder anderen Fleischliebhaber schwer fallen. Was die Leute vom veganen Monat halten, zeigt die Umfrage in der Stadt Solothurn.", hyperlink: "https://www.aargauerzeitung.ch/videos/solothurn-einen-ganzen-monat-vegan-wie-kommt-der-veganuar-bei-den-leuten-an-ld.2235780", date: "2022-01-06"},
  {paper: "Aargauer Zeitung", title: "Aargauer Topmodel Manuela Frey will sich einen Monat lang vegan ernähren ", content: "Tierische Produkte finden im Januar keinen Platz im Speiseplan: Das Brugger Model Manuela Frey macht beim «Veganuary» mit.", hyperlink: "https://www.aargauerzeitung.ch/aargau/brugg/veganuary-aargauer-topmodel-manuela-frey-will-sich-einen-monat-lang-vegan-ernaehren-ld.2233725", date: "2021-12-30"},
  {paper: "netzwoche", title: "Das sind die Gewinner der DooH-Awards 2021 ", content: "Zum dritten Mal hat Clear Channel die DooH-Awards verliehen. Premiere feiert der Preis für die beste NGO- und NPO-Kampagne. Die Vegane Gesellschaft Schweiz gewinnt als bestes Start-up.\r\n", hyperlink: "https://www.netzwoche.ch/news/2021-11-22/das-sind-die-gewinner-der-dooh-awards-2021", date: "2021-11-22"},
  {paper: "Horizont", title: "Digitec Galaxus, Surprise und die Vegane Gesellschaft Schweiz sind die Gewinner ", content: "Clear Channel zeichnet zum dritten Mal die beste digitale Out-of Home-Kampagne aus und verleiht erstmals den Charity-Award für die beste NGO- oder NPO-Kampagne und den Rookie-Award für die beste Kampagne eines Start-ups oder DOOH-Newcomers. ", hyperlink: "https://www.horizont.net/schweiz/nachrichten/clear-channel-dooh-award-2021-digitec-galaxus-surprise-und-die-vegane-gesellschaft-sind-die-gewinner-195925", date: "2021-11-18"},
  {paper: "SRF", title: "Macht's die Milch noch?", content: "Seit den 1930er-Jahren bekommen Schweizer Kinder Milch in der Schule. Die Aktion ist mittlerweile umstritten. ", hyperlink: "https://www.srf.ch/kultur/gesellschaft-religion/tag-der-pausenmilch-macht-s-die-milch-noch", date: "2021-11-03"},
  {paper: "Blick", title: "Tierschützer rufen zu Boykott des Tags der Pausenmilch auf ", content: "Tierschutzorganisationen haben zum Boykott des Tags der Pausenmilch an Schweizer Schulen vom Donnerstag aufgerufen. Dieser wird jedes Jahr von Swissmilk organisiert und soll auf Milch als «gesunde Zwischenverpflegung» aufmerksam machen.", hyperlink: "https://www.blick.ch/wirtschaft/von-swissmilk-organisiert-tierschuetzer-rufen-zu-boykott-des-tags-der-pausenmilch-auf-id16956440.html", date: "2021-11-03"},
  {paper: "Tages-Anzeiger", title: "Warum vegane Milch so viel teurer ist als Kuhmilch", content: "Hafermilch kostet doppelt so viel wie Kuhmilch, zeigt ein Preisvergleich. Ist die Herstellung wirklich teurer, oder verdienen sich Anbieter dank Öko-Foodtrends eine goldene Nase?", hyperlink: "https://www.tagesanzeiger.ch/warum-vegi-milch-so-viel-teurer-ist-als-kuhmilch-526622811098", date: "2021-06-07"},
  {paper: "SRF", title: "Was ist mit der Milch passiert? ", content: "Früher war die Milch ein Symbol für gesunde Ernährung. Heute verträgt jede fünfte Person in der Schweiz keine Milch mehr. Auch die Forschung ist hin und her gerissen. Studien und Gegenstudien propagieren den Milchkonsum oder stellen ihn infrage. Warum ist das mit der Milch so kompliziert geworden?", hyperlink: "https://www.srf.ch/audio/treffpunkt/was-ist-mit-der-milch-passiert?id=11966579", date: "2021-04-15"},
  {paper: "Nau", title: "«Veganuary»: Vegan-Monat verleiht fleischlosem Essen Boom", content: "Laut Lebensmittelhändlern war der «Veganuary» ein voller Erfolg. Doch nun ging der vegane Monat zu Ende – spüren das auch die Läden?", hyperlink: "https://www.nau.ch/news/schweiz/veganuary-vegan-monat-verleiht-fleischlosem-essen-boom-65866014", date: "2021-02-08"},
  {paper: "SRF", title: "«Veganuary» war ein voller Erfolg – auch dank Influencern", content: "Mit einer cleveren Marketingstrategie gelang es der veganen Gesellschaft, Grossverteiler und Blogger ins Boot zu holen und so auch hierzulande Zehntausende zu mobilisieren.", hyperlink: "https://www.srf.ch/news/schweiz/vegane-ernaehrung-veganuary-war-ein-voller-erfolg-auch-dank-influencern", date: "2021-02-04"},
  {paper: "Migros", title: "«Vegane Schinkengipfeli fände ich toll»", content: "Der Veganuary, der fleischlose ­Januar, ist vorbei. Und mit ihm auch der vegane Hype? Absolut nicht, sagt Laura ­Lombardini (35), ­Geschäftsleiterin der Veganen ­Gesellschaft Schweiz. Vegan zu leben, werde in ein paar Jahren völlig normal sein.", hyperlink: "https://www.migros.ch/de/Magazin/2021/veganerin-laura-lombardini.html", date: "2021-01-29"},
  {paper: "Aargauer Zeitung", title: "Im Januar wird vegan gegessen", content: "Fleisch, Milch und Eier haben im Januar bei einem Teil der Bevölkerung keinen Platz. Auch Aargauerinnen und Aargauer machen an der Veganuary-Kampagne mit. Drei von ihnen erzählen von ihren Erfahrungen.", hyperlink: "https://www.aargauerzeitung.ch/aargau/kanton-aargau/im-januar-wird-vegan-gegessen-so-geht-es-drei-aargauerinnen-im-veganuary-ld.2086585", date: "2021-01-17"},
  {paper: "Luzerner Zeitung", title: "Ohne Milch und Käse durch den Januar: So erleben zwei Luzernerinnen ihre Teilnahme am Veganuary", content: "Bald ist Halbzeit: Seit Anfang Januar isst die Schweiz vegan. Zumindest ein Teil davon – dank des Veganuarys. Hier erklären wir, was das genau ist. Zudem erzählen zwei Luzerner Teilnehmerinnen von ihren bisherigen Erfahrungen.", hyperlink: "https://www.luzernerzeitung.ch/zentralschweiz/luzern/veganuary-ohne-milch-und-kaese-durch-den-januar-so-erleben-zwei-luzernerinnen-ihre-teilnahme-am-veganuary-ld.2084353?reduced=true", date: "2021-01-11"},
  {paper: "Nau", title: "Vegan: «Veganuary» wird zum Mega-Business", content: "Der Januar steht ganz im Zeichen des Veganismus. Der sogenannte «Veganuary» wird immer populärer. Diesem Trend folgen auch zahlreiche Detailhändler.", hyperlink: "https://www.nau.ch/news/schweiz/vegan-veganuary-wird-zum-mega-business-65846499", date: "2021-01-10"},
  {paper: "p.s. - Die Linke Zürcher Zeitung", title: "Grüner Januar", content: "Nach mehreren erfolgreichen ‹Veganuaries› blickt die Vegane Gesellschaft Schweiz auf erfolgreiche Kampagnen zurück – und erkennt ein grundlegendes Umdenken im Essverhalten der Bevölkerung. ", hyperlink: "https://www.pszeitung.ch/gruener-januar/", date: "2022-02-04"},
  {paper: "Nau.ch", title: "Veganuary wird zum absoluten Kassenschlager", content: "Der Veganuary entwickelt sich zum Kassenschlager. Nach einem Rekordumsatz im Jahr 2021 war die Nachfrage auch diesen Januar ungebrochen hoch.", hyperlink: "https://www.nau.ch/news/wirtschaft/veganuary-wird-zum-absoluten-kassenschlager-66097438", date: "2022-01-31"},
  {paper: "FM1 Today", title: "Wie vegan und «dry» war dieser Januar wirklich?", content: "egan oder ohne Alkohol ins neue Jahr starten – oder vielleicht gleich beides zusammen. Der «Veganuary» und der «Dry January» machen gute Vorsätze zum Kollektiverlebnis. Doch zahlen sich diese Aktionsmonate für die Detailhändler auch aus?", hyperlink: "https://www.fm1today.ch/schweiz/wie-vegan-und-dry-war-dieser-januar-wirklich-145255455", date: "2022-01-31"},
  {paper: "Tagesanzeiger.ch", title: "Pflanzliche Alternativen zu Fleisch sind vielen zu teuer", content: "Für vegane Würste, Burger und Speck verlangen Detailhändler oft mehr als für das Original aus Fleisch. Deshalb verzichten viele Kundinnen und Kunden darauf.", hyperlink: "https://www.tagesanzeiger.ch/pflanzliche-alternativen-zu-fleisch-sind-vielen-zu-teuer-932546417836", date: "2022-01-30"}
])
Ahoy::Visit.create!([
  {visit_token: "b1a6d627-4231-437b-8b1b-dc8e5a099767", visitor_token: "7bb97b51-0780-42d8-b189-d22a2ddf9c06", user_id: nil, ip: "127.0.0.1", user_agent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36", referrer: nil, referring_domain: nil, landing_page: "http://localhost:3000/media", browser: "Chrome", os: "GNU/Linux", device_type: "Desktop", country: nil, region: nil, city: nil, latitude: nil, longitude: nil, utm_source: nil, utm_medium: nil, utm_term: nil, utm_content: nil, utm_campaign: nil, app_version: nil, os_version: nil, platform: nil, started_at: "2022-02-24 08:11:18"}
])
Ahoy::Event.create!([
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"index", "controller"=>"media"}, time: "2022-02-24 08:11:18"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"index", "controller"=>"media"}, time: "2022-02-24 08:12:24"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"new", "controller"=>"media"}, time: "2022-02-24 08:12:42"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"create", "controller"=>"media"}, time: "2022-02-24 08:13:55"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"id"=>"17", "action"=>"show", "controller"=>"media"}, time: "2022-02-24 08:13:55"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"new", "controller"=>"media"}, time: "2022-02-24 08:14:05"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"create", "controller"=>"media"}, time: "2022-02-24 08:14:38"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"id"=>"18", "action"=>"show", "controller"=>"media"}, time: "2022-02-24 08:14:38"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"new", "controller"=>"media"}, time: "2022-02-24 08:14:42"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"create", "controller"=>"media"}, time: "2022-02-24 08:15:24"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"id"=>"19", "action"=>"show", "controller"=>"media"}, time: "2022-02-24 08:15:24"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"new", "controller"=>"media"}, time: "2022-02-24 08:15:39"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"new", "controller"=>"media"}, time: "2022-02-24 08:15:40"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"create", "controller"=>"media"}, time: "2022-02-24 08:16:07"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"id"=>"20", "action"=>"show", "controller"=>"media"}, time: "2022-02-24 08:16:07"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"index", "controller"=>"media"}, time: "2022-02-24 08:16:10"},
  {visit_id: 1, user_id: nil, name: "Ran action", properties: {"action"=>"index", "controller"=>"media"}, time: "2022-02-24 08:16:14"}
])

doorkeeper = Doorkeeper::Application.create(name: "ionic", redirect_uri: "", scopes: "")


Worker.create(first_name: "Thomas")
Worker.create(first_name: "Peter")
Worker.create(first_name: "Joachim")
