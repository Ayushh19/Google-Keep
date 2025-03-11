

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  TextField,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { addDays, addWeeks, setHours, setMinutes, format, parse } from 'date-fns';

const QUICK_OPTIONS = [
  { label: 'Later today', icon: AccessTimeIcon, getValue: () => setHours(setMinutes(new Date(), 0), 20) },
  { label: 'Tomorrow', icon: CalendarTodayIcon, getValue: () => addDays(setHours(setMinutes(new Date(), 0), 8), 1) },
  { label: 'Next week', icon: CalendarTodayIcon, getValue: () => addWeeks(setHours(setMinutes(new Date(), 0), 8), 1) },
];

const ReminderDialog = ({ open, onClose, onSave }) => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd HH:mm'));

  const handleQuickOptionSelect = (option) => {
    const date = option.getValue();
    setSelectedDate(format(date, 'yyyy-MM-dd HH:mm'));
    handleSave(date);
  };

  const handleSave = () => {
    const parsedDate = parse(selectedDate, 'yyyy-MM-dd HH:mm', new Date());
    if (!isNaN(parsedDate)) {
      onSave(parsedDate);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Add reminder</DialogTitle>
      <DialogContent>
        <List>
          {QUICK_OPTIONS.map((option) => (
            <ListItem
              key={option.label}
              button
              onClick={() => handleQuickOptionSelect(option)}
              sx={{ py: 1 }}
            >
              <ListItemIcon>
                <option.icon />
              </ListItemIcon>
              <ListItemText primary={option.label} />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
            Enter date & time (YYYY-MM-DD HH:mm)
          </Typography>
          <TextField
            fullWidth
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            placeholder="YYYY-MM-DD HH:mm"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderDialog;
