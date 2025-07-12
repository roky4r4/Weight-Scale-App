
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
    <header className="bg-industrial-800 border-b border-industrial-600 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-primary">
            {t('app.title')}
          </div>
          {title && (
            <div className="text-lg text-industrial-200">
              {title}
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          size="lg"
          onClick={toggleLanguage}
          className="btn-large min-h-[60px] text-lg"
        >
          {language === 'en' ? '🇩🇪 Deutsch' : '🇬🇧 English'}
        </Button>
      </div>
    </header>
  );
};

export default Header;
