import React, { useEffect } from 'react';
import { auth } from '@/utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '@/utils/userSlice';
import { SUPPORTED_LANGUAGE } from '@/utils/constants';
import { toggleGptSearchView } from '@/utils/gptSlice';
import { changeLanguage } from '@/utils/configSlice';
import Logo from './Logo';
import { Button } from './ui/button';
import { Search, Home, LogOut, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.user);
  const showGptSearch = useSelector((store: any) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => navigate('/error'));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3">
      <div className="glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Logo size="md" />
        
        {user && (
          <div className="flex items-center gap-2 sm:gap-3">
            {showGptSearch && (
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  className="appearance-none pl-9 pr-8 py-2 bg-secondary/50 text-foreground rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer backdrop-blur-sm border border-glass-border/30"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGE.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier} className="bg-background">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <Button
              variant={showGptSearch ? "glass" : "gradient"}
              size="sm"
              onClick={handleGptSearch}
              className="gap-2"
            >
              {showGptSearch ? (
                <>
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">AI Search</span>
                </>
              )}
            </Button>
            
            {user?.photoURL && (
              <img 
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hidden sm:block ring-2 ring-glass-border" 
                alt="Profile" 
                src={user.photoURL} 
              />
            )}
            
            <Button 
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-destructive gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
