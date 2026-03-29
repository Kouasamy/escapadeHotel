(() => {
  const STORAGE_KEY = 'escapade-lang';
  const FALLBACK_LANG = 'fr';
  const SUPPORTED_LANGS = ['fr', 'en'];

  const translations = {
    fr: {
      common: {
        escapadeLoader: 'L\'ESCAPADE',
        loading: 'Chargement',
        or: 'ou',
        about: 'À PROPOS',
        menu: 'MENU',
        close: 'FERMER',
        roomsSuites: 'NOS SUITES',
        restaurant: 'LE RESTAURANT',
        lounge: 'LE LOUNGE',
        event: 'ÉVÈNEMENTS',
        contactUs: 'Contactez-nous',
        discover: 'Découvrir',
        reserveSuite: 'Réserver une suite',
        reserveSpace: 'Réserver un espace',
        findSuite: 'Trouver une suite',
        footerMenu: 'MENU',
        footerContact: 'CONTACT',
        footerMenuRooms: 'Chambres & Suites',
        footerMenuRestaurant: 'Restaurant',
        footerMenuLounge: 'Lounge',
        footerMenuEvents: 'Évènementiel',
        footerMenuAbout: 'À propos',
        footerSubmit: 'Envoyer',
        footerTerms: 'Conditions générales',
        footerPrivacy: 'Politique de confidentialité',
        footerRights: '©2025 – Tous droits réservés par L\'Escapade.',
        footerAddress: 'Assinie, Km 12, Côte d\'Ivoire',
        footerPlaceholderName: 'Nom',
        footerPlaceholderFirstName: 'Prénom',
        footerPlaceholderEmail: 'Adresse e-mail',
        footerPlaceholderPhone: 'Numéro de téléphone',
        footerPlaceholderMessage: 'Ecrivez votre message',
        footerReservationTitle: 'Numéro de réservation',
        footerPaymentTitle: 'Numéro de paiement',
      },
      home: {
        faqQuestion1: '1. Êtes-vous ouverts tous les jours ?',
        faqAnswer1:
          'Oui.<br>L\'Escapade vous accueille tous les jours, y compris les jours fériés.<br>Notre équipe est à votre entière disposition pour vous recevoir et vous faire vivre une expérience unique, que ce soit pour un séjour, un déjeuner ou un moment de détente dans un cadre d\'exception.',
        faqQuestion2: '2. Quels sont les horaires du lounge ?',
        faqAnswer2:
          'Le lounge de L\'Escapade est ouvert du jeudi au dimanche, de 16h à 02h.<br>Vous pourrez y savourer nos cocktails signature, profiter d\'une ambiance musicale soigneusement sélectionnée et vous imprégner de l\'atmosphère unique de L\'Escapade jusqu\'au cœur de la soirée.',
        faqQuestion3: '3. Combien de personnes peut accueillir la villa familiale ?',
        faqAnswer3:
          'La villa familiale peut accueillir jusqu\'à 4 personnes dans des conditions optimales de confort.<br>Pour toute demande spécifique ou pour une capacité supérieure, un devis personnalisé peut être établi sur demande, afin de garantir une expérience adaptée et qualitative.',
        faqQuestion4: '4. Peut-on accéder à la piscine en déjeunant simplement à l\'hôtel ?',
        faqAnswer4:
          'L\'accès à la piscine est prioritairement réservé à nos résidents.<br>Toutefois, les clients non-résidents peuvent y accéder sous réserve d\'une consommation minimale de 20 000 FCFA par personne, selon les disponibilités.<br>Notre équipe se tient à votre disposition pour vous informer sur les modalités d\'accès et les horaires.',
      },
      restaurant: {},
      lounge: {},
      suites: {
        roomsSuitesHeroTitle: 'NOS SUITES',
        suiteJuniorTitle: 'SUITES <span class="highlight text-[#BB996B]">JUNIOR</span>',
        suiteSeniorTitle: 'SUITES <span class="highlight text-[#BB996B]">SÉNIOR</span>',
        suiteSeniorVipTitle: 'SUITES SÉNIOR <span class="highlight text-[#BB996B]">AVEC PISCINES</span>',
        suiteSeniorWithPool: 'Suites sénior avec piscines',
        suiteVillaFamilialeTitle: 'VILLA FAMILIALE AVEC <span class="highlight text-[#BB996B]">PISCINE PRIVÉE</span>',
        suiteJuniorTitleSingle: 'SUITE JUNIOR',
        suiteSeniorTitleSingle: 'SUITE SÉNIOR',
        extraMattressInfo: 'Il est possible d\'ajouter un matelas supplémentaire. L\'ajout du matelas entraîne des frais additionnels de 15 000 FCFA.',
        extraMattressInfoJunior: '*Possibilité d\'ajouter un matelas supplémentaire à partir de 15 000 FCFA.',
        extraMattressInfoSenior: 'Il est possible d\'ajouter un matelas supplémentaire. L\'ajout du matelas entraîne des frais additionnels de 15 000 FCFA.',
        extraMattressInfoSeniorVip: 'Il est possible d\'ajouter un matelas supplémentaire. L\'ajout du matelas entraîne des frais additionnels de 15 000 FCFA.',
        extraMattressInfoDynamic: 'Il est possible d\'ajouter un matelas supplémentaire. L\'ajout du matelas entraîne des frais additionnels de 15 000 FCFA.',
        extraMattressInfoVillaFamiliale: 'Il est possible d\'ajouter un matelas supplémentaire. L\'ajout du matelas entraîne des frais additionnels de 15 000 FCFA.',
      },
      events: {
        eventsListTitle: 'ÉVÈNEMENTS À <span class="highlight">L\'ESCAPADE</span>',
        eventsListIntro: 'Retour en images sur nos événements récents : des rendez-vous hebdomadaires qui font vibrer la lagune.',
        eventsSunsetTitle: 'La Boutique Éphémère',
        eventsSunsetSchedule: 'À venir',
        eventsSunsetDescription: 'Une alliance inédite entre trois maisons de prestige qui s\'unissent pour créer une expérience lifestyle inédite au cœur de L\'Escapade Hotel. Du 20 décembre au 5 janvier, plongez dans un univers où la Haute Couture, la Maroquinerie d\'art et la Beauté premium se rencontrent pour sublimer vos fêtes de fin d\'année. La Boutique éphémère vous ouvre ses portes de 16 h à 21 h.',
        eventsSunsetTime: 'Édition du 20 décembre 2025 au 5 janvier 2026',
        eventsBrunchTitle: 'Pilates Sunset avec <br> Core Fitness',
        eventsBrunchSchedule: 'À venir',
        eventsBrunchDescription: 'L\'Escapade proposera une séance exclusive de Pilates Sunset en collaboration avec Core Fitness et le coach Baba. Une expérience bien-être au coucher du soleil, pensée pour allier énergie, détente et cadre inspirant.',
        eventsBrunchTime: 'Édition du 17 janvier 2026',
        eventsCorporateTitle: 'Dîners et Déjeuner de Noël',
        eventsCorporateSchedule: 'À venir',
        eventsCorporateDescription: 'Les 24 et 25 décembre, L\'Escapade invite ses hôtes à célébrer Noël autour d\'un dîner à l\'assiette puis d\'un déjeuner buffet, tous deux accompagnés d\'un cocktail de bienvenue. Deux moments chaleureux pour vivre la magie des fêtes dans un décor tropical.',
        eventsCorporateCapacity: 'Édition du 24 & 25 décembre 2025',
        eventsWeddingTitle: 'Saint-Sylvestre & <br> Brunch du Nouvel An',
        eventsWeddingSchedule: 'À venir',
        eventsWeddingDescription: 'L\'Escapade propose des packs exclusifs pour un réveillon tout en élégance, comprenant suite, dîner et champagne. Le 1er janvier, un brunch festif au bord de la lagune marquera l\'entrée en douceur dans la nouvelle année.',
        eventsWeddingCapacity: 'Édition du 31 décembre 2025 & 1er janvier 2026',
        eventsComingSoon: 'À venir',
        eventsOngoing: 'EN COURS',
        eventsPast: 'PASSÉ',
      },
      about: {
        aboutHeroTitle: 'À PROPOS',
        aboutSectionTitle: 'À <span class="highlight">PROPOS</span>',
        aboutParagraph1: 'L\'Escapade Hôtel, depuis mai 2025.  Venez découvrir un refuge élégant posé en bordure de lagune à Assinie. Ici, le temps s\'étire et les sens s\'éveillent. Entre nature apaisante et raffinement discret,  votre voyage commence là où le luxe rencontre la quiétude.  Érigé sur 3,5 hectares, le domaine abrite 22 suites  juniors et séniors au design épuré,  pensées pour offrir confort, intimité et sérénité à chaque hôte.  À L\'Escapade, chaque instant devient une invitation au lâcher-prise.',
      },
      reservationStep1: {
        reservationPageTitleStep2: 'Page Réservation - Étape 2',
        reservationStepDate: 'Date',
        reservationStepCategory: 'Catégorie',
        reservationStepDetails: 'Détails & confirmation',
        reservationStepPayment: 'Paiement',
        reservationSelectCategory: 'Sélectionnez une catégorie de suite',
        reservationNightsSelected: 'Nuits sélectionnées',
        reservationGuests: 'Invités',
        reservationModify: 'Modifier',
        reservationViewSuite: 'Voir la suite',
        reservationSelect: 'Sélectionner',
        reservationNext: 'Suivant',
        reservationWeekend: 'Week-end',
        reservationWeek: 'Semaine',
        reservationTerrace: 'Terrasse',
        reservationPool: 'Piscine',
        reservationTV: 'TV',
        reservationSuiteJunior: 'SUITES JUNIOR',
        reservationSuiteSenior: 'SUITES SÉNIOR',
        reservationSuiteSeniorPool: 'SUITES SÉNIOR AVEC PISCINE',
        reservationVillaFamiliale: 'VILLA FAMILIALE AVEC PISCINE PRIVÉE',
        reservationCapacityDefault: 'Capacité par défaut :',
        reservationCapacityMax: 'Capacité maximale :',
        reservationAdults: 'adultes',
        reservationPersons: 'personne',
        reservationPersonsPlural: 'personnes',
        reservationChildren: 'enfant',
        reservationChildrenPlural: 'enfants',
        reservationIncluding: 'dont',
        reservationExtraMattress: "Possibilité d'ajouter un matelas supplémentaire pour 15 000 FCFA, augmentant la capacité.",
        reservationExtraMattresses: "Possibilité d'ajouter des matelas supplémentaires pour 15 000 FCFA chacun, jusqu'à 8 personnes.",
        arrival: 'Arrivée',
        departure: 'Départ',
        guests: 'Invités',
      },
      reservationStep3: {
        reservationPageTitleStep3: 'Détails & Confirmation',
        reservationStepDate: 'Date',
        reservationStepCategory: 'Catégorie',
        reservationStepDetails: 'Détails & confirmation',
        reservationStepPayment: 'Paiement',
        reservationDetailsTitle: 'Détails & Confirmation',
        reservationTotal: 'TOTAL',
        reservationNext: 'Suivant',
        reservationGuests: 'Invités',
        reservationSuiteSenior: 'SUITES SÉNIOR',
      },
      reservationStep4: {
        reservationStepDate: 'Date',
        reservationStepCategory: 'Catégorie',
        reservationStepDetails: 'Détails & confirmation',
        reservationStepPayment: 'Paiement',
        reservationContactTitle: 'Contact',
        reservationFirstName: { placeholder: 'Prénom*' },
        reservationEmail: { placeholder: 'E-mail*' },
        reservationNationality: { placeholder: 'Nationalité' },
        reservationLastName: { placeholder: 'Nom de famille*' },
        reservationPhone: { placeholder: 'Téléphone*' },
        reservationMessage: { placeholder: 'Message ou Demandes spéciales' },
        reservationNext: 'Suivant',
      },
      reservationStep5: {
        reservationInstructionsTitle: 'Prochaines étapes importantes',
        reservationStep1: '<span class="text-[#B78F62] font-medium">L\'Escapade vous appellera</span> au numéro de réservation pour confirmer votre réservation et finaliser les détails avec vous. Ensuite, vous pourrez procéder au paiement sur Wave ou Orange Money.',
        reservationStep2: 'Pour confirmer définitivement votre réservation, vous devrez verser <span class="text-[#B78F62] font-medium">50&nbsp;% du montant total</span> de votre séjour.',
        reservationStep3: '<span class="text-[#B78F62] font-medium">Effectuez le dépôt</span> en utilisant l\'un des numéros de paiement ci-dessous pour sécuriser votre réservation.',
        reservationNumberTitle: 'Numéro de réservation',
        paymentNumberTitle: 'Numéro de paiement',
        reservationConfirmed: 'Réservation <span style="color: #B78F62;">Confirmée</span>',
        reservationConfirmationMessage1: 'Un mail de confirmation vous sera envoyé après validation de votre réservation.',
        reservationConfirmationMessage2: 'L\'équipe de <span style="color: #B78F62;">L\'Escapade</span> vous remercie pour votre confiance.',
      },
      genericReservation: {},
    },
    en: {
      common: {
        escapadeLoader: 'L\'ESCAPADE',
        loading: 'Loading',
        or: 'or',
        menu: 'MENU',
        close: 'CLOSE',
        roomsSuites: 'OUR SUITES',
        restaurant: 'THE RESTAURANT',
        lounge: 'THE LOUNGE',
        event: 'EVENTS',
        about: 'ABOUT',
        contactUs: 'Contact Us',
        discover: 'Discover',
        reserveSuite: 'Book a suite',
        reserveSpace: 'Book a venue',
        arrival: '<span class="label-text">Arrival</span><span class="date-value"></span>',
        departure: '<span class="label-text">Departure</span><span class="date-value"></span>',
        guests: '<span class="label-text">Guests</span><span class="guest-value" style="display: none;">1</span>',
        findSuite: 'Find a suite',
        footerMenu: 'MENU',
        footerContact: 'CONTACT',
        footerMenuRooms: 'Our Suites',
        footerMenuRestaurant: 'Restaurant',
        footerMenuLounge: 'Lounge',
        footerMenuEvents: 'Events',
        footerMenuAbout: 'About',
        footerSubmit: 'Send',
        footerTerms: 'Terms & Conditions',
        footerPrivacy: 'Privacy Policy',
        footerRights: '©2025 – All rights reserved by L’Escapade.',
        footerAddress: 'Assinie, Km 12, Côte d’Ivoire',
        footerPlaceholderName: 'Last name',
        footerPlaceholderFirstName: 'First name',
        footerPlaceholderEmail: 'Email address',
        footerPlaceholderPhone: 'Phone number',
        footerPlaceholderMessage: 'Write your message',
        footerReservationTitle: 'Reservation number',
        footerPaymentTitle: 'Payment number',
        contactAria: { 'aria-label': 'Contact us' },
      },
      home: {
        welcomeTo: 'Welcome to',
        escapade: 'L’Escapade',
        welcomeText:
          "Since <strong>May 2025</strong>, L'Escapade Hotel has offered an elegant sanctuary <strong>on the lagoon front</strong> in <strong>Assinie</strong>. Step into a haven where refinement meets serenity.",
        experienceText:
          'Here, time stretches and the senses awaken. Between soothing nature and understated sophistication, your journey begins where luxury meets calm. Spread across 3.5 hectares, the estate houses 22 junior and senior suites with pure lines, designed for comfort, privacy, and serenity. At L’Escapade, every moment invites you to let go.',
        learnMore: 'Learn more',
        discoverSuitesTitle: 'Our Rooms<span class="highlight"> & Suites</span>',
        suiteJuniorTitle: 'Junior Suites',
        suiteSeniorVipTitle: 'Senior VIP Suites',
        suiteSeniorTitle: 'Senior Suites',
        suiteSeniorWithPool: 'Senior suites with pools',
        suiteJuniorVipTitle: 'Junior VIP Suites',
        viewRoom: 'View the suite',
        discoverRestaurantTitle: 'Our <span class="highlight">Restaurant</span>',
        restaurantText:
          'L’Escapade’s restaurant is a bistronomic destination where flavour, generosity, and elegance meet to create an unforgettable dining experience.',
        discoverRestaurant: 'Discover the restaurant',
        loungeDiscoverTitle: 'Our <span class="highlight">Lounge</span>',
        loungeParagraph1:
          'In an atmosphere where luxury meets serenity, the Lounge invites you to an exceptional moment. Between soft lighting, subtle notes, and attentive service, each instant becomes a unique experience—an art of living to be savoured fully.',
        loungeParagraph2:
          'An urban ambience in Assinie. L’Escapade’s lounge blends city elegance with coastal softness: a place designed to unwind, connect, and enjoy simple moments in a refined setting.',
        loungeParagraph3:
          'An urban spirit in Assinie.<br>The Lounge at L’Escapade combines urban elegance with coastal softness: a space created to unwind, reconnect, and enjoy simple moments in a refined setting.',
        loungeCta: 'Learn more',
        faqTitle: '<span>Frequently</span> <span class="highlight">Asked Questions</span>',
        faqQuestion1: '1. Are you open every day?',
        faqAnswer1:
          'Yes. L\'Escapade welcomes you every day, including public holidays. Our team is at your complete disposal to receive you and provide you with a unique experience, whether for a stay, lunch, or a moment of relaxation in an exceptional setting.',
        faqQuestion2: '2. What are the lounge opening hours?',
        faqAnswer2:
          'L\'Escapade\'s lounge is open from Thursday to Sunday, 4 p.m. to 2 a.m. You can savor our signature cocktails, enjoy a carefully selected musical ambiance, and immerse yourself in L\'Escapade\'s unique atmosphere until the heart of the evening.',
        faqQuestion3: '3. How many people can the family villa accommodate?',
        faqAnswer3:
          'The family villa can accommodate up to 4 people under optimal comfort conditions. For any specific request or for a higher capacity, a personalized quote can be provided upon request, to ensure an adapted and qualitative experience.',
        faqQuestion4: '4. Can we access the pool by simply having lunch at the hotel?',
        faqAnswer4:
          'Pool access is primarily reserved for our residents. However, non-resident guests can access it subject to a minimum consumption of 20,000 FCFA per person, depending on availability. Our team is at your disposal to inform you about access conditions and hours.',
      },
      restaurant: {
        restaurantHeroTitle: 'RESTAURANT',
        restaurantSectionTitle: 'RESTAURANT <span class="highlight">L’ESCAPADE</span>',
        restaurantIntroHours:
          'Open from <strong>7:30 a.m. to 10:30 p.m.</strong>, L’Escapade’s restaurant welcomes guests throughout the day. The menu invites you on a savoury journey between the <strong>Mediterranean</strong> and <strong>Côte d’Ivoire</strong>. Each dish reflects a refined cultural blend, marrying ancestral Ivorian recipes with contemporary techniques.',
        restaurantIntroFresh:
          'Fresh fish, seafood, shellfish, and local specialties are crafted with creativity and authenticity for an unforgettable culinary experience.',
        restaurantBistronomic:
          'L’Escapade’s restaurant is a bistronomic destination where flavour, generosity, and elegance meet to deliver an unforgettable culinary experience.',
        restaurantDecor:
          'In a setting that combines local charm with contemporary refinement, every meal feels like a true sensory escape.',
        restaurantChefTitle: 'OUR CHEF & <span class="highlight">SPECIALTIES</span>',
        restaurantChefIntro:
          'From field to plate, our chef transforms each ingredient with precision, drawing inspiration from Côte d’Ivoire and far beyond.',
        restaurantChefCraft:
          'Local produce is elevated with exceptional savoir-faire, blending Ivorian tradition with international gastronomy.',
        restaurantChefName: 'The Chef’s Name…',
        restaurantChefPassion:
          'Every creation reflects passion and precision, turning each plate into a work of art where creativity honours the ingredient.<br>Each tasting celebrates balance, texture, and emotion.',
        restaurantViewMenu: 'View our menu',
        restaurantDishesTitle: 'OUR <span class="highlight">DISHES</span>',
        restaurantDish1: 'Dish 1',
        restaurantDish2: 'Dish 2',
        restaurantDish3: 'Dish 3',
        restaurantDish4: 'Dish 4',
        restaurantDish5: 'Dish 5',
        restaurantDish6: 'Dish 6',
      },
      reservationStep1: {
        reservationPageTitleStep2: 'Reservation Page - Step 2',
        reservationStepDate: 'Date',
        reservationStepCategory: 'Category',
        reservationStepDetails: 'Details & confirmation',
        reservationStepPayment: 'Payment',
        reservationSelectCategory: 'Select a suite category',
        reservationNightsSelected: 'Nights selected',
        reservationGuests: 'Guests',
        reservationModify: 'Modify',
        reservationViewSuite: 'View the suite',
        reservationSelect: 'Select',
        reservationNext: 'Next',
        reservationWeekend: 'Weekend',
        reservationWeek: 'Week',
        reservationTerrace: 'Terrace',
        reservationPool: 'Pool',
        reservationTV: 'TV',
        reservationSuiteJunior: 'JUNIOR SUITES',
        reservationSuiteSenior: 'SENIOR SUITES',
        reservationSuiteSeniorPool: 'SENIOR SUITES WITH POOL',
        reservationVillaFamiliale: 'FAMILY VILLA WITH PRIVATE POOL',
        reservationCapacityDefault: 'Default capacity:',
        reservationCapacityMax: 'Maximum capacity:',
        reservationAdults: 'adults',
        reservationPersons: 'person',
        reservationPersonsPlural: 'people',
        reservationChildren: 'child',
        reservationChildrenPlural: 'children',
        reservationIncluding: 'including',
        reservationExtraMattress: 'Possibility to add an extra mattress for 15,000 FCFA, increasing capacity.',
        reservationExtraMattresses: 'Possibility to add extra mattresses for 15,000 FCFA each, up to 8 people.',
        arrival: 'Arrival',
        departure: 'Departure',
        guests: 'Guests',
      },
      reservationStep3: {
        reservationPageTitleStep3: 'Details & Confirmation',
        reservationStepDate: 'Date',
        reservationStepCategory: 'Category',
        reservationStepDetails: 'Details & confirmation',
        reservationStepPayment: 'Payment',
        reservationDetailsTitle: 'Details & Confirmation',
        reservationTotal: 'TOTAL',
        reservationNext: 'Next',
        reservationGuests: 'Guests',
        reservationSuiteSenior: 'SENIOR SUITES',
      },
      reservationStep4: {
        reservationStepDate: 'Date',
        reservationStepCategory: 'Category',
        reservationStepDetails: 'Details & confirmation',
        reservationStepPayment: 'Payment',
        reservationContactTitle: 'Contact',
        reservationFirstName: { placeholder: 'First name*' },
        reservationEmail: { placeholder: 'Email*' },
        reservationNationality: { placeholder: 'Nationality' },
        reservationLastName: { placeholder: 'Last name*' },
        reservationPhone: { placeholder: 'Phone*' },
        reservationMessage: { placeholder: 'Message or special requests' },
        reservationNext: 'Next',
        reservationPaymentTitle: 'Payment',
        reservationCardNumber: { placeholder: 'Card number*' },
        reservationCardName: { placeholder: 'Name on card*' },
        reservationCardExpiry: { placeholder: 'Expiry (MM/YY)*' },
        reservationCardCVV: { placeholder: 'CVV*' },
        reservationPayingLabel: 'You will pay:',
        reservationConfirmPayment: 'Confirm payment',
      },
      reservationStep5: {
        reservationInstructionsTitle: 'Important next steps',
        reservationStep1: '<span class="text-[#B78F62] font-medium">L\'Escapade will call you</span> at the reservation number to confirm your reservation and finalize details with you. Then, you can proceed with payment on Wave or Orange Money.',
        reservationStep2: 'To definitively confirm your reservation, you will need to pay <span class="text-[#B78F62] font-medium">50% of the total amount</span> of your stay.',
        reservationStep3: '<span class="text-[#B78F62] font-medium">Make the deposit</span> using one of the payment numbers below to secure your reservation.',
        reservationNumberTitle: 'Reservation number',
        paymentNumberTitle: 'Payment number',
        reservationConfirmed: 'Reservation <span style="color: #B78F62;">Confirmed</span>',
        reservationConfirmationMessage1: 'A confirmation email will be sent after validation of your reservation.',
        reservationConfirmationMessage2: 'The <span style="color: #B78F62;">L\'Escapade</span> team thanks you for your trust.',
      },
      lounge: {
        loungeHeroTitle: 'LOUNGE',
        loungeSectionTitle: 'LOUNGE <span class="highlight">L\'ESCAPADE</span>',
        loungeParagraph1: 'An urban ambience in Assinie. L\'Escapade\'s lounge blends city elegance with coastal softness: a place designed to unwind, connect, and enjoy simple moments in a refined setting. An Abidjan-style lounge. Here, the convivial energy of the capital meets the serenity of the lagoon to offer a unique experience.',
        loungeDrinksTitle: 'Drinks<span class="highlight"> & Refined Cocktails</span>',
        loungeDrinksDescription: 'The taste of vacation, to be savored without moderation. Exotic cocktails, fresh fruit juices, selected wines, and refined spirits make up our menu, served with discreet and warm attention.',
        loungeEveningDescription: 'When evening comes, the lanterns light up, the music softens, and the lounge transforms into a peaceful and welcoming place, conducive to exchanges and shared moments.',
      },
      suites: {
        roomsSuitesHeroTitle: 'OUR SUITES',
        suiteJuniorSalonTitle: 'JUNIOR SUITE + LIVING ROOM',
        suiteJuniorSalonSubtitle: 'The <span class="highlight text-[#B78F62]">junior + living room</span> suite',
        suiteJuniorSalonDescription: 'With its 70 m², the Junior + Living Room Suite combines contemporary design, natural materials and local inspiration. Bright and refined, it reveals authentic luxury in its greatest simplicity. This suite features a spacious living room for added comfort.',
        suiteCapacity: 'Capacity: 2 adults*',
        suiteJuniorCapacity: 'Capacity: 2 adults*',
        suiteWeekRate: 'Weekly rate: 240,000 FCFA',
        suiteWeekendRate: 'Weekend rate: 300,000 FCFA',
        pool: 'Pool',
        bookNow: 'Book now',
        viewSuite: 'View the suite',
        suiteJuniorTitle: 'JUNIOR <span class="highlight text-[#BB996B]">SUITES</span>',
        suiteSeniorTitle: 'SENIOR <span class="highlight text-[#BB996B]">SUITES</span>',
        suiteJuniorVipTitle: 'JUNIOR SUITE <span class="text-gold">VIP</span>',
        suiteSeniorVipTitle: 'SENIOR SUITES WITH <span class="highlight text-[#BB996B]">POOLS</span>',
        suiteSeniorWithPool: 'Senior suites with pools',
        suiteVillaFamilialeTitle: 'FAMILY VILLA WITH <span class="highlight text-[#BB996B]">PRIVATE POOL</span>',
        suiteJuniorTitleSingle: 'JUNIOR SUITE',
        suiteSeniorTitleSingle: 'SENIOR SUITE',
        suiteWeekend: 'Weekend',
        suiteWeek: 'Week',
        suiteIntroText: 'The comfort of a private apartment blending openness and harmony, <br> Our suites ranging from <b>45 m² to 170 m²</b> combine contemporary design,<br> natural materials and local inspiration. Bright and refined <br>, they reveal authentic luxury in its greatest simplicity. <img src="/media/510_6.svg" alt="Decorative element" class="deco-element deco-1 absolute -top-10 -right-10 w-20 h-20" /> <img src="/media/510_8.svg" alt="Decorative element" class="deco-element deco-2 absolute -bottom-10 -left-10 w-20 h-20" />',
        suiteComfortText: 'Here, every detail celebrates the art of living: wood, light, the softness of fabrics, the serenity of volumes. A perfect balance between nature and elegance. <img src="/media/510_6.svg" alt="Decorative element" class="deco-element deco-1 absolute -top-10 -right-10 w-20 h-20" /> <img src="/media/510_8.svg" alt="Decorative element" class="deco-element deco-2 absolute -bottom-10 -left-10 w-20 h-20" />',
        suiteJuniorSubtitle: 'The <span class="highlight text-[#B78F62]">junior</span> suite',
        suiteJuniorDescription: 'With its 45 m², the Junior Suite combines contemporary design, natural materials and local inspiration. Bright and refined, it reveals authentic luxury in its greatest simplicity.',
        suiteJuniorCapacity: 'Capacité : 2 adultes*',
        suiteJuniorWeekRate: 'Weekly rate: 200,000 FCFA',
        suiteJuniorWeekendRate: 'Weekend rate: 250,000 FCFA',
        suiteSeniorSubtitle: 'The <span class="highlight text-[#B78F62]">senior</span> suite',
        suiteSeniorDescription: 'With an area of 70 m², the Senior Suite offers spacious volumes reminiscent of the comfort of a private apartment. Its distinct interiors, blending openness and harmony, create a restful and elegant setting.',
        suiteSeniorCapacity: 'Capacity: 2 adults*',
        suiteSeniorWeekRate: 'Weekly rate: 280,000 FCFA',
        suiteSeniorWeekendRate: 'Weekend rate: 350,000 FCFA',
        suiteJuniorVipSubtitle: 'The <span class="highlight text-[#B78F62]">junior VIP</span> suite',
        suiteJuniorVipDescription: 'With its 70 m², the Junior VIP Suite combines contemporary design, natural materials and local inspiration. Bright and refined, it reveals authentic luxury in its greatest simplicity. This VIP suite offers exceptional comfort with two connecting suites.',
        suiteJuniorVipCapacity: 'Capacity: 2 Connecting suites',
        suiteJuniorVipWeekRate: 'Weekly rate: 520,000 FCFA (2 Suites)',
        suiteJuniorVipWeekendRate: 'Weekend rate: 650,000 FCFA (2 Suites)',
        suiteSeniorVipSubtitle: 'The <span class="highlight text-[#B78F62]">senior VIP</span> suite',
        suiteSeniorVipDescription: 'With an area of 70 m², the Senior VIP Suite offers spacious volumes reminiscent of the comfort of a private apartment. Its distinct interiors, blending openness and harmony, create a restful and elegant setting. This VIP suite offers exceptional comfort for an unforgettable stay.',
        suiteSeniorVipCapacity: 'Capacity: 2 adults*',
        suiteSeniorVipWeekRate: 'Weekly rate: 320,000 FCFA',
        suiteSeniorVipWeekendRate: 'Weekend rate: 400,000 FCFA',
        suiteVillaFamilialeSubtitle: 'The <span class="highlight text-[#B78F62]">Family Villa</span>',
        suiteVillaFamilialeDescription: 'Open onto L\'Escapade\'s lush garden, the Family Villa is a true haven of exception. With its private pool and large terrace bordered by coconut trees, it offers a soothing view of the hotel\'s green spaces. With its two bedrooms, elegant living room and generous volumes, this suite is designed to welcome families and loved ones in absolute comfort. Every detail reflects Ivorian hospitality.',
        suiteVillaFamilialeCapacity: 'Capacity: 4 adults*',
        privatePool: 'Private pool',
        extraMattressInfo: 'It is possible to add an extra mattress. Adding the mattress incurs additional fees of 15,000 FCFA.',
        extraMattressInfoJunior: '*Possibility to add an extra mattress from 15,000 FCFA.',
        extraMattressInfoSenior: 'It is possible to add an extra mattress. Adding the mattress incurs additional fees of 15,000 FCFA.',
        extraMattressInfoSeniorVip: 'It is possible to add an extra mattress. Adding the mattress incurs additional fees of 15,000 FCFA.',
        extraMattressInfoDynamic: 'It is possible to add an extra mattress. Adding the mattress incurs additional fees of 15,000 FCFA.',
        extraMattressInfoVillaFamiliale: 'It is possible to add an extra mattress. Adding the mattress incurs additional fees of 15,000 FCFA.',

      },
      events: {
        eventsHeroTitle: 'EVENTS',
        eventsSectionTitle: 'EVENTS <span class="highlight">L\'ESCAPADE</span>',
        eventsParagraph1: 'L\'Escapade is the ideal setting to celebrate life\'s great moments. Waterfront weddings, birthdays, small-group retreats, or large celebrations bringing together up to 2,000 guests: every event finds its perfect setting here.',
        eventsParagraph2: 'At L\'Escapade, elegance and nature come together to offer a setting where the most precious memories are created and the most beautiful inspirations are born.',
        eventsParagraph3: 'Enjoy your event to the fullest, we take care of the rest. From setup to decoration, through catering, entertainment, and even guest accommodation, our team coordinates every detail with care and flexibility.',
        eventsParagraph4: 'You can choose your own service providers, or entrust everything to our organization for a turnkey service, always adapted to your wishes.',
        eventsSpacesTitle: 'Our spaces adapt to all your wishes:',
        eventsSpace1: '● a natural beach facing the lagoon for unforgettable ceremonies,',
        eventsSpace2: '● an outdoor pool for lively evenings,',
        eventsSpace3: '● a refined lounge and restaurant for elegant receptions,',
        eventsSpace4: '● a dedicated room for seminars, team building and professional meetings.',
        eventsListTitle: 'EVENTS AT <span class="highlight">L\'ESCAPADE</span>',
        eventsListIntro: 'A look back at our recent events: weekly gatherings that bring the lagoon to life.',
        eventsSunsetTitle: 'The Pop-up Boutique',
        eventsSunsetSchedule: 'Coming soon',
        eventsSunsetDescription: 'An unprecedented alliance between three prestigious houses unites to create a unique lifestyle experience at the heart of L\'Escapade Hotel. From December 20 to January 5, immerse yourself in a world where Haute Couture, Art Leather Goods, and Premium Beauty come together to enhance your year-end celebrations. The Pop-up Boutique opens its doors from 4 PM to 9 PM.',
        eventsSunsetTime: 'Edition from December 20, 2025 to January 5, 2026',
        eventsBrunchTitle: 'Sunset Pilates with <br> Core Fitness',
        eventsBrunchSchedule: 'Coming soon',
        eventsBrunchDescription: 'L\'Escapade will offer an exclusive Sunset Pilates session in collaboration with Core Fitness and coach Baba. A wellness experience at sunset, designed to combine energy, relaxation, and an inspiring setting.',
        eventsBrunchTime: 'Edition on January 17, 2026',
        eventsCorporateTitle: 'Christmas Dinners & Lunch',
        eventsCorporateSchedule: 'Coming soon',
        eventsCorporateDescription: 'On December 24 and 25, L\'Escapade invites its guests to celebrate Christmas around a plated dinner followed by a buffet lunch, both accompanied by a welcome cocktail. Two warm moments to experience the magic of the holidays in a tropical setting.',
        eventsCorporateCapacity: 'Edition on December 24 & 25, 2025',
        eventsWeddingTitle: 'New Year\'s Eve & <br> New Year\'s Brunch',
        eventsWeddingSchedule: 'Coming soon',
        eventsWeddingDescription: 'L\'Escapade offers exclusive packages for an elegant New Year\'s Eve, including suite, dinner, and champagne. On January 1st, a festive brunch by the lagoon will mark a gentle entry into the new year.',
        eventsWeddingCapacity: 'Edition on December 31, 2025 & January 1, 2026',
        eventsComingSoon: 'Coming soon',
        eventsOngoing: 'ONGOING',
        eventsPast: 'PAST',
      },
      about: {
        aboutHeroTitle: 'About',
        aboutSectionTitle: 'ABOUT',
        aboutParagraph1: 'L\'Escapade Hotel, since May 2025. Come discover an elegant refuge nestled on the lagoon shore in Assinie. Here, time stretches and the senses awaken. Between soothing nature and understated refinement, your journey begins where luxury meets tranquility. Built on 3.5 hectares, the estate houses 22 junior and senior suites with pure lines, designed to offer comfort, intimacy, and serenity to each guest. At L\'Escapade, every moment becomes an invitation to let go.',
      },
    },
  };

  const attributeTargets = new Map();

  function getStoredLanguage() {
    const stored = window.localStorage?.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) {
      return stored;
    }
    return FALLBACK_LANG;
  }

  function persistLanguage(lang) {
    try {
      window.localStorage?.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors (e.g., private browsing)
    }
  }

  function getPageScope() {
    const page = document.body?.dataset?.page || 'common';

    // Mapper les pages de réservation
    if (page === 'reservation-step1' || page === 'reservation-step2') {
      return 'reservationStep1';
    }
    if (page === 'reservation-step3') {
      return 'reservationStep3';
    }
    if (page === 'reservationStep4' || page === 'reservation-step4') {
      return 'reservationStep4';
    }
    if (page === 'reservation-step5' || page === 'reservationStep5') {
      return 'reservationStep5';
    }

    // Mapper les pages de suites individuelles au scope "suites"
    if (page && (page.startsWith('suite-') || page === 'suite-list')) {
      return 'suites';
    }
    // Mapper les pages d'événements
    if (page === 'events' || page === 'evenementiel') {
      return 'events';
    }
    // Mapper les pages à propos
    if (page === 'about' || page === 'apropos') {
      return 'about';
    }
    return page;
  }

  function buildLookup(lang) {
    const page = getPageScope();
    const dict = translations[lang] || {};
    return {
      ...dict.common,
      ...(dict[page] || {}),
    };
  }

  function ensureFrenchBaseline() {
    const frDict = translations.fr;
    const page = getPageScope();

    if (!frDict.common) {
      frDict.common = {};
    }
    if (!frDict[page]) {
      frDict[page] = {};
    }

    document.querySelectorAll('[data-translate]').forEach((el) => {
      const key = el.dataset.translate;
      if (!key) return;

      const attr = el.dataset.translateAttr;

      if (attr) {
        const targets = attr.split(',').map((a) => a.trim()).filter(Boolean);
        targets.forEach((targetAttr) => {
          const value = el.getAttribute(targetAttr);
          if (value != null && !attributeTargets.has(`${key}:${targetAttr}`)) {
            attributeTargets.set(`${key}:${targetAttr}`, targetAttr);
          }
          if (value != null && !frDict.common[key] && !frDict[page][key]) {
            frDict[page][key] = frDict[page][key] || {};
          }
          if (value != null) {
            frDict[page][key] = frDict[page][key] || {};
            frDict[page][key][targetAttr] = value;
            frDict.common[key] = frDict.common[key] || {};
            if (typeof frDict.common[key] !== 'object') {
              frDict.common[key] = {};
            }
            frDict.common[key][targetAttr] = frDict.common[key][targetAttr] ?? value;
          }
        });
      } else {
        const content = el.innerHTML;
        if (!frDict.common[key] && !frDict[page][key]) {
          frDict[page][key] = content;
        }
        if (!frDict.common[key]) {
          frDict.common[key] = content;
        }
      }
    });
  }

  function getFrenchValue(key, attr) {
    const page = getPageScope();
    const frDict = translations.fr;
    const candidate =
      (frDict[page] && frDict[page][key]) ||
      (frDict.common && frDict.common[key]);

    if (!candidate) return null;
    if (attr) {
      if (typeof candidate === 'object') {
        return candidate[attr] ?? null;
      }
      return null;
    }
    if (typeof candidate === 'object') {
      return null;
    }
    return candidate;
  }

  function applyTranslations(lang) {
    const lookup = buildLookup(lang);
    const isFrench = lang === 'fr';

    // Définir la langue sur l'élément html immédiatement
    if (document.documentElement) {
      document.documentElement.lang = lang;
    }

    // Appliquer les traductions de manière optimisée
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach((el) => {
      const key = el.dataset.translate;
      if (!key) return;

      const attrDescriptor = el.dataset.translateAttr;

      if (attrDescriptor) {
        const targets = attrDescriptor.split(',').map((a) => a.trim()).filter(Boolean);
        targets.forEach((attr) => {
          const value = lookup[key];
          if (value && typeof value === 'object' && value[attr] != null) {
            el.setAttribute(attr, value[attr]);
          } else if (isFrench) {
            const fallback = getFrenchValue(key, attr);
            if (fallback != null) {
              el.setAttribute(attr, fallback);
            }
          }
        });
        return;
      }

      const translation = lookup[key];

      if (translation != null) {
        // Pour les éléments title, utiliser textContent au lieu de innerHTML
        if (el.tagName === 'TITLE') {
          el.textContent = typeof translation === 'string' ? translation.replace(/<[^>]*>/g, '') : translation;
        } else {
        el.innerHTML = translation;
        }
      } else if (isFrench) {
        const fallback = getFrenchValue(key);
        if (fallback != null) {
          if (el.tagName === 'TITLE') {
            el.textContent = typeof fallback === 'string' ? fallback.replace(/<[^>]*>/g, '') : fallback;
          } else {
          el.innerHTML = fallback;
          }
        }
      }
    });

    // Synchroniser les lang-switcher
    syncActiveLanguage(lang);

    // Déclencher un événement personnalisé pour notifier le changement de langue
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

    // Exposer les fonctions globalement pour qu'elles puissent être appelées depuis d'autres scripts
    window.applyTranslations = applyTranslations;
    window.ensureFrenchBaseline = ensureFrenchBaseline;
  }

  // Écouter les événements languageChanged pour réappliquer les traductions
  window.addEventListener('languageChanged', (event) => {
    if (event.detail && event.detail.lang) {
      applyTranslations(event.detail.lang);
    }
  });

  function syncActiveLanguage(lang) {
    const langControls = document.querySelectorAll('[data-lang]');
    langControls.forEach((control) => {
      const controlLang = control.dataset.lang;
      if (!controlLang) return;

      // Vérifier si le contrôle est dans un menu-lang-switcher
      const isMenuLangSwitcher = control.closest('.menu-lang-switcher');
      const isLangSwitcher = control.closest('.lang-switcher');

      if (controlLang === lang) {
        // Activer la langue
        control.classList.add('lang-active');
        control.setAttribute('aria-current', 'true');

        // Pour menu-lang-switcher, ajouter aussi la classe "active"
        if (isMenuLangSwitcher) {
          control.classList.add('active');
        }

        // Pour lang-switcher, ajouter font-medium pour le style visuel
        if (isLangSwitcher) {
          control.classList.add('font-medium');
        }
      } else {
        // Désactiver la langue
        control.classList.remove('lang-active', 'active', 'font-medium');
        control.removeAttribute('aria-current');
      }
    });
  }

  function handleSwitcherClicks() {
    // Utiliser la délégation d'événements sur document pour capturer tous les clics
    // Utiliser la phase de capture pour intercepter tôt et éviter les conflits
    document.addEventListener('click', (event) => {
      const target = event.target.closest('[data-lang]');
      if (!target) return;

      const lang = target.dataset.lang;
      if (!lang || !SUPPORTED_LANGS.includes(lang)) return;

      // Empêcher la navigation mais ne pas interférer avec le menu overlay
      event.preventDefault();
      event.stopPropagation();

      // Sauvegarder et appliquer la langue instantanément
      persistLanguage(lang);
      applyTranslations(lang);

      // Forcer une nouvelle application pour s'assurer que tout est traduit
      requestAnimationFrame(() => {
        applyTranslations(lang);
      });
    }, true); // Utiliser la phase de capture pour intercepter tôt
  }

  // Observer pour détecter les nouveaux éléments ajoutés dynamiquement
  let translationObserver = null;

  function setupTranslationObserver() {
    if (!window.MutationObserver) return;

    translationObserver = new MutationObserver((mutations) => {
      let shouldReapply = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              if (node.hasAttribute && node.hasAttribute('data-translate')) {
                shouldReapply = true;
              } else if (node.querySelectorAll) {
                const hasTranslations = node.querySelectorAll('[data-translate]').length > 0;
                if (hasTranslations) shouldReapply = true;
              }
            }
          });
        }
      });

      if (shouldReapply) {
        const currentLang = getStoredLanguage();
        applyTranslations(currentLang);
      }
    });

    // Observer les changements dans le body
    if (document.body) {
      translationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  // Appliquer la langue immédiatement, même avant DOMContentLoaded pour éviter le flash
  function initTranslations() {
    // Charger la langue sauvegardée immédiatement
    const lang = getStoredLanguage();

    // Définir la langue sur l'élément html immédiatement
    if (document.documentElement) {
      document.documentElement.lang = lang;
    }

    // Fonction pour appliquer les traductions de manière agressive
    const applyNow = () => {
      ensureFrenchBaseline();
      handleSwitcherClicks();

      // Appliquer immédiatement
      applyTranslations(lang);

      // Réappliquer plusieurs fois pour s'assurer que tout est traduit
      // (certains éléments peuvent être ajoutés dynamiquement)
      setTimeout(() => {
        applyTranslations(lang);
      }, 10);

      setTimeout(() => {
        applyTranslations(lang);
      }, 100);

      setTimeout(() => {
        applyTranslations(lang);
      }, 300);

      setupTranslationObserver();
    };

    // Appliquer la langue dès que possible
    if (document.readyState === 'loading') {
      // Si le DOM est encore en cours de chargement, attendre DOMContentLoaded
      document.addEventListener('DOMContentLoaded', applyNow);

      // Mais aussi essayer d'appliquer dès que le body est disponible
      if (document.body) {
        applyNow();
      } else {
        // Observer l'apparition du body
        const bodyObserver = new MutationObserver((mutations, obs) => {
          if (document.body) {
            applyNow();
            obs.disconnect();
          }
        });
        bodyObserver.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      }
    } else {
      // DOM déjà chargé
      applyNow();
    }
  }

  // Démarrer immédiatement
  initTranslations();
})();

