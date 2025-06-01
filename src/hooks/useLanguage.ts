
import { useState, useContext, createContext, ReactNode } from 'react';

export type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    'app.title': 'ScaleApp',
    'common.confirm': 'Confirm',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.done': 'Done',
    'common.cancel': 'Cancel',
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    
    // Screen 1
    'screen1.title': 'Weight Confirmation',
    'screen1.detected.weight': 'Detected Weight',
    'screen1.number.plate': 'Number Plate',
    'screen1.not.you': 'Not you? Enter correct plate:',
    'screen1.welcome': 'Welcome',
    'screen1.confirm.info': 'Confirm Information',
    
    // Screen 2
    'screen2.title': 'Select Delivery Address',
    'screen2.add.new': 'Add New Address',
    
    // Screen 3
    'screen3.title': 'Select Products',
    'screen3.select.product': 'Select Product',
    'screen3.stockyard': 'Stockyard',
    'screen3.available': 'Available',
    'screen3.low.stock': 'Low Stock',
    'screen3.unavailable': 'Unavailable',
    
    // Screen 4
    'screen4.title': 'Enter Quantity',
    'screen4.selected.product': 'Selected Product',
    'screen4.quantity.tons': 'tons',
    'screen4.full.load': 'Full Load',
    'screen4.manual.quantity': 'Manual Quantity',
    'screen4.add.to.load': 'Add to Load',
    'screen4.location.info': 'Selected product will be found in',
    
    // Screen 5
    'screen5.title': 'Order Confirmed - Proceed to Location',
    'screen5.proceed.to': 'Proceed to',
    'screen5.sync.message': 'Your order information has been synced with Weclapp ERP and sent to the excavator driver.',
    'screen5.proceed.load': 'Proceed to Load',
    
    // Screen 8
    'screen8.title': 'Select Product to Unload',
    'screen8.welcome.weight': 'Welcome {name}. Current truck weight is {weight} kg.',
    'screen8.auto.calculation': 'Quantity will be calculated automatically by weight difference. Manual input is not required.',
    'screen8.unload.at': 'Please unload {product} at {area}',
    'screen8.confirm.unload': 'Confirm Unload Product',
    
    // Screen 9
    'screen9.title': 'Unload Complete & Select New Products',
    'screen9.unloaded.confirmation': 'You have unloaded {weight} kg of {product}.',
    'screen9.select.new': 'Select new products to load:',
    'screen9.proceed.load': 'Proceed to Load',
    
    // Excavator Operator
    'operator.title': 'Order Management',
    'operator.start.loading': 'Start Loading',
    'operator.start.unloading': 'Start Unloading',
    'operator.mark.completed': 'Mark as Completed',
    'operator.add.note': 'Add Note',
    'operator.awaiting': 'Awaiting',
    'operator.in.progress': 'In Progress',
    'operator.completed': 'Completed',
    
    // Transaction Finalization
    'transaction.title': 'Transaction Summary',
    'transaction.weighing.complete': 'Weighing Complete',
    'transaction.delivery.note': 'Delivery note is being printed.',
    'transaction.order.summary': 'Order Summary',
    'transaction.payment.options': 'Payment Options',
    'transaction.card.payment': 'Card Payment',
    'transaction.cash.payment': 'Cash Payment',
    'transaction.complete.payment': 'Please complete payment to proceed',
    'transaction.process.payment': 'Process Payment',
    'transaction.gross.weight': 'Gross Weight',
    'transaction.tare.weight': 'Tare Weight',
    'transaction.net.weight': 'Net Weight'
  },
  de: {
    // Common
    'app.title': 'ScaleApp',
    'common.confirm': 'Bestätigen',
    'common.next': 'Weiter',
    'common.previous': 'Zurück',
    'common.done': 'Fertig',
    'common.cancel': 'Abbrechen',
    'common.add': 'Hinzufügen',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.save': 'Speichern',
    
    // Screen 1
    'screen1.title': 'Gewichtsbestätigung',
    'screen1.detected.weight': 'Erkanntes Gewicht',
    'screen1.number.plate': 'Kennzeichen',
    'screen1.not.you': 'Nicht Sie? Korrektes Kennzeichen eingeben:',
    'screen1.welcome': 'Willkommen',
    'screen1.confirm.info': 'Informationen bestätigen',
    
    // Screen 2
    'screen2.title': 'Lieferadresse auswählen',
    'screen2.add.new': 'Neue Adresse hinzufügen',
    
    // Screen 3
    'screen3.title': 'Produkte auswählen',
    'screen3.select.product': 'Produkt auswählen',
    'screen3.stockyard': 'Lagerplatz',
    'screen3.available': 'Verfügbar',
    'screen3.low.stock': 'Niedriger Bestand',
    'screen3.unavailable': 'Nicht verfügbar',
    
    // Screen 4
    'screen4.title': 'Menge eingeben',
    'screen4.selected.product': 'Ausgewähltes Produkt',
    'screen4.quantity.tons': 'Tonnen',
    'screen4.full.load': 'Vollladung',
    'screen4.manual.quantity': 'Manuelle Menge',
    'screen4.add.to.load': 'Zur Ladung hinzufügen',
    'screen4.location.info': 'Das ausgewählte Produkt befindet sich in',
    
    // Screen 5
    'screen5.title': 'Bestellung bestätigt - Zum Standort fahren',
    'screen5.proceed.to': 'Fahren Sie zu',
    'screen5.sync.message': 'Ihre Bestellinformationen wurden mit Weclapp ERP synchronisiert und an den Baggerfahrer gesendet.',
    'screen5.proceed.load': 'Zur Beladung fahren',
    
    // Screen 8
    'screen8.title': 'Produkt zum Entladen auswählen',
    'screen8.welcome.weight': 'Willkommen {name}. Aktuelles LKW-Gewicht ist {weight} kg.',
    'screen8.auto.calculation': 'Die Menge wird automatisch durch die Gewichtsdifferenz berechnet. Manuelle Eingabe ist nicht erforderlich.',
    'screen8.unload.at': 'Bitte entladen Sie {product} bei {area}',
    'screen8.confirm.unload': 'Entladeprodukt bestätigen',
    
    // Screen 9
    'screen9.title': 'Entladung abgeschlossen & Neue Produkte auswählen',
    'screen9.unloaded.confirmation': 'Sie haben {weight} kg {product} entladen.',
    'screen9.select.new': 'Neue Produkte zum Laden auswählen:',
    'screen9.proceed.load': 'Zur Beladung fahren',
    
    // Excavator Operator
    'operator.title': 'Auftragsverwaltung',
    'operator.start.loading': 'Beladung starten',
    'operator.start.unloading': 'Entladung starten',
    'operator.mark.completed': 'Als abgeschlossen markieren',
    'operator.add.note': 'Notiz hinzufügen',
    'operator.awaiting': 'Wartend',
    'operator.in.progress': 'In Bearbeitung',
    'operator.completed': 'Abgeschlossen',
    
    // Transaction Finalization
    'transaction.title': 'Transaktionsübersicht',
    'transaction.weighing.complete': 'Wiegung abgeschlossen',
    'transaction.delivery.note': 'Lieferschein wird gedruckt.',
    'transaction.order.summary': 'Bestellübersicht',
    'transaction.payment.options': 'Zahlungsoptionen',
    'transaction.card.payment': 'Kartenzahlung',
    'transaction.cash.payment': 'Barzahlung',
    'transaction.complete.payment': 'Bitte Zahlung abschließen',
    'transaction.process.payment': 'Zahlung verarbeiten',
    'transaction.gross.weight': 'Bruttogewicht',
    'transaction.tare.weight': 'Leergewicht',
    'transaction.net.weight': 'Nettogewicht'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
