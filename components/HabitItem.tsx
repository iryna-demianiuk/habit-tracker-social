import { Ionicons } from '@expo/vector-icons';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface HabitItemProps {
  habit: string;
  isCompleted: boolean;
  streak: number;
  isEditing: boolean;
  editText: string;
  onToggle: () => void;
  onDelete: () => void;
  onStartEdit: () => void;
  onEditTextChange: (text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

export default function HabitItem({ 
  habit, 
  isCompleted, 
  streak, 
  isEditing,
  editText,
  onToggle, 
  onDelete,
  onStartEdit,
  onEditTextChange,
  onSaveEdit,
  onCancelEdit
}: HabitItemProps) {
  
  if (isEditing) {
    return (
      <View style={styles.habitItem}>
        <TextInput
          style={styles.editInput}
          value={editText}
          onChangeText={onEditTextChange}
          autoFocus
          onSubmitEditing={() => {
            onSaveEdit();
            Keyboard.dismiss();
          }}
          returnKeyType="done"
        />
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => {
            onSaveEdit();
            Keyboard.dismiss();
          }}
        >
          <Ionicons name="checkmark-circle" size={24} color="#10b981" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={onCancelEdit}
        >
          <Ionicons name="close-circle" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.habitItem}>
      <TouchableOpacity 
        style={styles.habitContent}
        onPress={onToggle}
      >
        <View style={styles.checkbox}>
          {isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <TouchableOpacity 
          style={styles.textContent}
          onLongPress={onStartEdit}
          delayLongPress={500}
        >
          <Text style={styles.habitText}>{habit}</Text>
          {streak > 0 && (
            <Text style={styles.streakText}>{streak} day streak</Text>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    paddingRight: 12,
  },
  habitContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#3e3f40',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  checkmark: {
    color: '#3e3f40',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContent: {
    flex: 1,
  },
  habitText: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 2,
  },
  streakText: {
    fontSize: 13,
    color: '#f97316',
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  editInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 8,
  },
  editButton: {
    padding: 8,
    marginLeft: 8,
  },
});

