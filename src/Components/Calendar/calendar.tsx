"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import jaLocale from "@fullcalendar/core/locales/ja";
import { Box, Container, Paper } from "@mui/material";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from '@mui/material/CircularProgress';
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function Calendar() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [title, setTitle] = useState<string>("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState<EventClickArg | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState<{ start: string; end: string | null }>({ start: '', end: '' });
  const [loading,setLoading]=useState<boolean>(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [calendarEvents, setCalendarEvents] = useState([
        {
          title: "ミーティング",
          start: "2025-02-14",
          backgroundColor: "#4CAF50",
          borderColor: "#4CAF50",
        },
        {
          title: "締め切り",
          start: "2025-02-16",
          end: "2025-02-18",
          backgroundColor: "#FF5722",
          borderColor: "#FF5722",
        },
    ]);

    const handleEventClick = (arg: EventClickArg) => {
      setDeleteEvent(arg);
      setMenuAnchorEl(arg.el);
    };

    const handleEditClick = () => {
      setMenuAnchorEl(null);
      if (deleteEvent) {
        setEditTitle(deleteEvent.event.title);
        setEditDate({
          start: deleteEvent.event.startStr,
          end: deleteEvent.event.endStr || null
        });
        setEditOpen(true);
      }
    };

    const handleEditConfirm = async () => {
      try {
        setLoading(true);
        if (deleteEvent && editTitle) {
          const event = deleteEvent.event;
          event.setProp('title', editTitle);
          if (editDate.start) event.setStart(editDate.start);
          if (editDate.end) event.setEnd(editDate.end);
          
          setCalendarEvents(prevEvents => 
            prevEvents.map(e => 
              e.start === event.startStr ? 
              { ...e, title: editTitle, start: editDate.start, end: editDate.end || undefined } : 
              e
            )
          );
        }
        setEditOpen(false);
        setDeleteEvent(null);
      } catch (error) {
        throw new Error('Failed to edit event');
      } finally {
        setLoading(false);
      }
    };

    const handleDateClick = (arg: DateSelectArg) => {
      setSelectedDate(arg);
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setTitle("");
    };

    const handleAddEvent = () => {
        if (selectedDate && title) {
        const newEvent = {
            title: title,
            start: selectedDate.startStr,
            end: selectedDate.endStr,
            backgroundColor: "#4CAF50",
            borderColor: "#4CAF50",
        };
        setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
      }
      setLoading(false);
    };


    const handleDeleteConfirm = () => {
      if (deleteEvent) {
        deleteEvent.event.remove();
        setCalendarEvents(prevEvents => 
        prevEvents.filter(event => event.start !== deleteEvent.event.startStr)
        );
      }
      setDeleteConfirmOpen(false);
      setDeleteEvent(null);
    };

    const handleDeleteCancel = () => {
      setDeleteConfirmOpen(false);
      setDeleteEvent(null);
    };

  return (
    <Paper
      sx={{
        backgroundColor: "#effff",
        p: 3,
        borderRadius: 2,
        boxShadow: "rgb(0 0 0 / 5%) 0px 2px 4px",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{
            "& .fc": {
              fontFamily: "Arial, sans-serif",
              border: "none",
            },
            "& .fc-scrollgrid": {
              borderColor: "#000000",
            },
            "& .fc-col-header-cell": {
              backgroundColor: "#f5f5f5",
              borderBottom: "2px solid",
            },
            "& .fc-col-header-cell-cushion": {
              display: "inline-block",
              padding: "8px",
              color: "#666",
            },
            "& .fc-daygrid-day": {
              border: "1px solid",
              transition: "background-color 0.2s",
            },
            "& .fc-daygrid-day-number": {
              fontSize: "0.9rem",
              padding: "8px",
              color: "#333",
            },
            "& .fc-toolbar-title": {
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "#333",
            },
            "& .fc-button": {
              textTransform: "capitalize",
              backgroundColor: "#1976d2",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
              "&:focus": {
                boxShadow: "none",
              },
            },
            "& .fc-button-active": {
              backgroundColor: "#2196F3 !important", 
              color: "#ffffff !important",
            },
            "& .fc-day-today": {
              backgroundColor: "rgba(25, 118, 210, 0.1) !important",
            },
            "& .fc-event": {
              borderRadius: "4px",
              padding: "2px 4px",
              fontSize: "0.85rem",
            },
            "& .fc-theme-standard td, & .fc-theme-standard th": {
              borderColor: "#000000",
            },
            "& .fc-day-sat .fc-daygrid-day-number": {
              color: "#1976d2",
            },
            "& .fc-day-sun .fc-daygrid-day-number": {
              color: "#d32f2f",
            },
        }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,listMonth",
            }}
            locales={[jaLocale]}
            locale="ja"
            initialView="dayGridMonth"
            selectable={true}
            select={handleDateClick}
            dayHeaderFormat={{ weekday: "narrow" }}
            titleFormat={{ year: "numeric", month: "long" }}
            height="auto"
            aspectRatio={1.8}
            events={calendarEvents} 
            eventDisplay="block"
            eventClick={handleEventClick}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              meridiem: false,
            }}
          />
        </Box>
      </Container>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>新しい予定を追加</DialogTitle>
        <DialogContent>
          <TextField
            label="タイトル"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={() => handleAddEvent()} variant="contained" color="primary">
            追加
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>予定の削除確認</DialogTitle>
        <DialogContent>
          <p>この予定を削除してもよろしいですか？</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>キャンセル</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            削除
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="変更" />
        </MenuItem>
        <MenuItem onClick={() => {
          setMenuAnchorEl(null);
          setDeleteConfirmOpen(true);
        }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="削除" />
        </MenuItem>
      </Menu>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>予定の変更</DialogTitle>
        <DialogContent>
          <TextField
            label="タイトル"
            variant="outlined"
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            label="開始日"
            type="date"
            fullWidth
            value={editDate.start}
            onChange={(e) => setEditDate(prev => ({ ...prev, start: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            label="終了日"
            type="date"
            fullWidth
            value={editDate.end || ''}
            onChange={(e) => setEditDate(prev => ({ ...prev, end: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>キャンセル</Button>
          <Button onClick={handleEditConfirm} variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : '変更'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
