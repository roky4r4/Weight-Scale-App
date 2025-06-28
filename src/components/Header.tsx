
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <header className="bg-custom-gray px-8 py-6 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <div className="text-3xl font-bold text-text-light">
            {t('app.title')}
          </div>
          {title && (
            <div className="text-2xl text-text-light font-medium">
              {title}
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          onClick={toggleLanguage}
          className="h-16 px-8 text-lg font-semibold bg-white text-text-dark border-2 border-white hover:bg-custom-blue hover:text-text-dark transition-all duration-200"
        >
          {language === 'en' ? '🇩🇪 Deutsch' : '🇬🇧 English'}
        </Button>
      </div>
    </header>
  );
};

export default Header;
