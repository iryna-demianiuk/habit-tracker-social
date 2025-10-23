import { HabitsContext } from '@/app/_layout';
import { getBestStreak, getCompletionsThisMonth, getCompletionsThisWeek, getCurrentStreak, getTotalCompletions } from '@/app/utils/streakUtils';
import { Text, View } from '@/components/Themed';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';

export default function StatsScreen() {
  const { habits } = useContext(HabitsContext);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      {habits.map((habit) => (
        <View key={habit.id} style={styles.habitCard}>
          <Text style={styles.habitName}>{habit.name}</Text>
          <Text style={styles.habitPeriod}>Period: {habit.period}</Text>
          <Text style={styles.stat}>Current Streak: {getCurrentStreak(habit)} {habit.period}s</Text>
          <Text style={styles.stat}>Best Streak: {getBestStreak(habit)} {habit.period}s</Text>
          <Text style={styles.stat}>Total Completions: {getTotalCompletions(habit)}</Text>
          <Text style={styles.stat}>This Week: {getCompletionsThisWeek(habit)}</Text>
          <Text style={styles.stat}>This Month: {getCompletionsThisMonth(habit)}</Text>
        </View>
      ))}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  habitCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
  },
  habitName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  habitPeriod: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  stat: {
    fontSize: 14,
    marginVertical: 2,
  },
});
