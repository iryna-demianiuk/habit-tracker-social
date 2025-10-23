import { HabitsContext } from '@/app/_layout';
import { Habit } from '@/app/types/Habit';
import { getCurrentStreak } from '@/app/utils/streakUtils';
import HabitItem from '@/components/HabitItem';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HabitsScreen() {
  const { habits, setHabits } = useContext(HabitsContext);
  const [newHabitText, setNewHabitText] = useState<string>(''); 
  const [newHabitPeriod, setNewHabitPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>(''); 

  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const isCompletedToday = (habit: Habit) => {
    const todayStr = getTodayDateString();
    return habit.completionDates.includes(todayStr);
  };

  const calculateStreak = (habit: Habit) => {
    return getCurrentStreak(habit);
  };


  const toggleHabit = (id: string) => {
    const todayStr = getTodayDateString();
    
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;
      
      const isCompleted = habit.completionDates.includes(todayStr);
      
      if (isCompleted) {
        return {
          ...habit,
          completionDates: habit.completionDates.filter(date => date !== todayStr)
        };
      } else {
        return {
          ...habit,
          completionDates: [...habit.completionDates, todayStr]
        };
      }
    }));
  };

  const addHabit = () => {
    if (newHabitText.trim() === '') {
      return;
    }

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitText,
      completionDates: [],
      createdAt: new Date().toISOString(),
      period: newHabitPeriod // Use selected period
    };

    setHabits([...habits, newHabit]);
    setNewHabitText('');
    setNewHabitPeriod('daily'); // Reset to daily for next habit
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditText(currentName);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = () => {
    if (editText.trim() === '') {
      cancelEdit();
      return;
    }

    setHabits(habits.map(habit => 
      habit.id === editingId 
        ? { ...habit, name: editText.trim() }
        : habit
    ));
    
    setEditingId(null);
    setEditText('');
  };

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  const todayCompletedCount = habits.filter(habit => isCompletedToday(habit)).length;
  const totalHabitsCount = habits.length;
  const completionPercentage = totalHabitsCount > 0 
    ? Math.round((todayCompletedCount / totalHabitsCount) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.menuIcon}>
            <Ionicons name="menu" size={28} color="#ffffff" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>My Habits</Text>
            <Text style={styles.date}>{dateString}</Text>
          </View>
        </View>
      </View>

      {habits.length > 0 && (
        <View style={styles.progressContainer}>
          {completionPercentage === 100 && (
            <View style={styles.celebrationBanner}>
              <Text style={styles.celebrationEmoji}>🎉</Text>
              <Text style={styles.celebrationText}>All done for today!</Text>
              <Text style={styles.celebrationSubtext}>Amazing work! Keep it up</Text>
            </View>
          )}
          <View style={styles.progressStats}>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>{todayCompletedCount}</Text>
              <Text style={styles.progressLabel}>Completed</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>{totalHabitsCount}</Text>
              <Text style={styles.progressLabel}>Total</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>{completionPercentage}%</Text>
              <Text style={styles.progressLabel}>Done</Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${completionPercentage}%` }]} />
          </View>
        </View>
      )}

      <View style={styles.addHabitContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new habit..."
          placeholderTextColor="#9ca3af"
          value={newHabitText}
          onChangeText={setNewHabitText}
          onSubmitEditing={() => {
            addHabit();
            Keyboard.dismiss();
          }}
          returnKeyType="done"
          blurOnSubmit={true}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => {
          addHabit();
          Keyboard.dismiss();
        }}>
          <Ionicons name="add-circle" size={32} color="#3e3f40" />
        </TouchableOpacity>
      </View>

      <View style={styles.periodSelector}>
        <Text style={styles.periodLabel}>Frequency:</Text>
        <View style={styles.periodButtons}>
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                newHabitPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setNewHabitPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                newHabitPeriod === period && styles.periodButtonTextActive
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              {habits.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>🎯</Text>
                  <Text style={styles.emptyTitle}>No habits yet</Text>
                  <Text style={styles.emptyMessage}>
                    Start building your routine by adding your first habit above
                  </Text>
                </View>
              ) : (
                <>
                  {habits.map((habit) => (
                    <HabitItem
                      key={habit.id}
                      habit={habit.name}
                      isCompleted={isCompletedToday(habit)}
                      streak={calculateStreak(habit)}
                      isEditing={editingId === habit.id}
                      editText={editText}
                      onToggle={() => toggleHabit(habit.id)}
                      onDelete={() => deleteHabit(habit.id)}
                      onStartEdit={() => startEdit(habit.id, habit.name)}
                      onEditTextChange={setEditText}
                      onSaveEdit={saveEdit}
                      onCancelEdit={cancelEdit}
                    />
                  ))}
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#3e3f40',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
    padding: 4,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  progressContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  celebrationBanner: {
    backgroundColor: '#10b981',
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 20,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  celebrationEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  celebrationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  celebrationSubtext: {
    fontSize: 14,
    color: '#d1fae5',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  progressItem: {
    alignItems: 'center',
    flex: 1,
  },
  progressNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3e3f40',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  progressDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  addHabitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    color: '#1f2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addButton: {
    padding: 4,
  },
  periodSelector: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  periodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  periodButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#3b82f6',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  periodButtonTextActive: {
    color: '#ffffff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
});
