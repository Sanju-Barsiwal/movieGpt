import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '@/utils/userSlice';
import { USER_AVATAR } from '@/utils/constants';
import Validate from '@/utils/Validate';
import Logo from '@/components/Logo';
import BackgroundEffects from '@/components/BackgroundEffects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Separate state for form values
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/invalid-login-credentials':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/email-already-in-use':
        return 'This email is already registered. Try signing in instead.';
      case 'auth/weak-password':
        return 'Password is too weak. Use at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const handleValidate = async () => {
    const email = isSignIn ? signInEmail : signUpEmail;
    const password = isSignIn ? signInPassword : signUpPassword;
    const name = isSignIn ? null : signUpName;

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (!isSignIn && !name?.trim()) {
      setErrorMessage('Please enter your name');
      return;
    }

    const message = Validate(email, password, isSignIn ? undefined : name);
    setErrorMessage(message);

    if (message) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (!isSignIn) {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: USER_AVATAR,
        });
        const {
          uid,
          email: userEmail,
          displayName,
          photoURL,
        } = auth.currentUser!;
        dispatch(addUser({ uid, email: userEmail, displayName, photoURL }));
      } else {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
      }

      // ✅ Navigate to browse page after successful authentication
      navigate('/browse');
    } catch (error: any) {
      const errorCode = error.code || '';
      setErrorMessage(getFirebaseErrorMessage(errorCode));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
    setErrorMessage(null);
    // Forms have separate state, so no need to clear
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleValidate();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <BackgroundEffects />

      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse-glow hidden lg:block" />
      <div
        className="fixed bottom-32 right-16 w-3 h-3 bg-accent rounded-full animate-pulse-glow hidden lg:block"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="fixed top-1/3 right-10 w-1.5 h-1.5 bg-primary/70 rounded-full animate-pulse-glow hidden lg:block"
        style={{ animationDelay: '2s' }}
      />

      <div className="w-full max-w-md animate-scale-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        {/* Card */}
        <div className="glass-strong rounded-3xl p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {isSignIn ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground">
              {isSignIn
                ? 'Sign in to continue your journey'
                : 'Start your cinematic adventure'}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {isSignIn ? (
              // Sign In Form
              <>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="pl-12"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-12"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </>
            ) : (
              // Sign Up Form
              <>
                <div className="relative animate-slide-up">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="pl-12"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                <div
                  className="relative animate-slide-up"
                  style={{ animationDelay: '0.1s' }}
                >
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="pl-12"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                <div
                  className="relative animate-slide-up"
                  style={{ animationDelay: '0.2s' }}
                >
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-12"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </>
            )}

            {errorMessage && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 animate-slide-up">
                <p className="text-destructive text-sm text-center">
                  {errorMessage}
                </p>
              </div>
            )}

            <Button
              onClick={handleValidate}
              disabled={isLoading}
              variant="gradient"
              size="lg"
              className="w-full mt-6"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  {isSignIn ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={toggleSignIn}
                className="text-primary font-semibold hover:underline transition-colors"
              >
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Feature highlight */}
          <div className="mt-6 pt-6 border-t border-glass-border/30">
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Powered by AI recommendations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
