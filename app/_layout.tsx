import { Habit } from '@/app/types/Habit';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { createContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export const HabitsContext = createContext<{
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  saveHabits: () => void;
  loadHabits: () => void;
}>({
  habits: [],
  setHabits: () => {},
  saveHabits: () => {},
  loadHabits: () => {},
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    loadHabits();
  }, []);


  useEffect(() => {
    if (habits.length > 0) {
      saveHabits();
    }
  }, [habits]);

  const saveHabits = async () => {
    try {
      await AsyncStorage.setItem('habits', JSON.stringify(habits));
    } catch (error) {
      console.log('Error saving habits:', error);
    }
  };

  const loadHabits = async () => {
    try {
      const savedHabits = await AsyncStorage.getItem('habits');

      if (savedHabits) {
        const parsed = JSON.parse(savedHabits);
        
        if (parsed.length > 0 && typeof parsed[0] === 'string') {
          await AsyncStorage.removeItem('habits');
          await AsyncStorage.removeItem('completedHabits');
          setHabits([]);
        } else {
          setHabits(parsed);
        }
      }
    } catch (error) {
      console.log('Error loading habits:', error);
    }
  };

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav habits={habits} setHabits={setHabits} saveHabits={saveHabits} loadHabits={loadHabits} />;
}

function RootLayoutNav({ habits, setHabits, saveHabits, loadHabits }: { habits: Habit[], setHabits: (habits: Habit[]) => void, saveHabits: () => void, loadHabits: () => void }) {
  const colorScheme = useColorScheme();

  return (
    <HabitsContext.Provider value={{habits, setHabits, saveHabits, loadHabits}}>
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
    </HabitsContext.Provider>
  );
}
