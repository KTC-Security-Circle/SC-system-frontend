"use client";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import jaLocale from '@fullcalendar/core/locales/ja';
import { Box, Container, Paper } from '@mui/material'

export default function Calendar() {
    const events = [
        {
            title: 'ミーティング',
            start: '2025-02-14',
            backgroundColor: '#4CAF50',
            borderColor: '#4CAF50',
        },
        {
            title: '締め切り',
            start: '2025-02-16',
            end: '2025-02-18',
            backgroundColor: '#FF5722',
            borderColor: '#FF5722',
        }
    ];

    return (
        <Paper 
            sx={{ 
                backgroundColor: '#efffff',
                p: 3,
                borderRadius: 2,
                boxShadow: 'rgb(0 0 0 / 5%) 0px 2px 4px',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="lg">
                <Box 
                    sx={{ 
                        '& .fc': {
                            fontFamily: 'Arial, sans-serif',
                            border: 'none',
                        },
                        '& .fc-scrollgrid': {
                            borderColor: '#000000',
                        },
                        '& .fc-col-header-cell': {
                            backgroundColor: '#f5f5f5',
                            borderBottom: '2px solid, ',
                        },
                        '& .fc-col-header-cell-cushion': {
                            display: 'inline-block',
                            padding: '8px',
                            color: '#666',
                        },
                        '& .fc-daygrid-day': {
                            border: '1px solid ',
                            transition: 'background-color 0.2s',
                        },
                        '& .fc-daygrid-day-number': {
                            fontSize: '0.9rem',
                            padding: '8px',
                            color: '#333',
                        },
                        '& .fc-toolbar-title': {
                            fontSize: '1.5rem',
                            fontWeight: 500,
                            color: '#333',
                        },
                        '& .fc-button': {
                            textTransform: 'capitalize',
                            backgroundColor: '#1976d2',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                            '&:focus': {
                                boxShadow: 'none',
                            },
                        },
                        '& .fc-day-today': {
                            backgroundColor: 'rgba(25, 118, 210, 0.05) !important',
                        },
                        '& .fc-event': {
                            borderRadius: '4px',
                            padding: '2px 4px',
                            fontSize: '0.85rem',
                        },
                        '& .fc-theme-standard td, & .fc-theme-standard th': {
                            borderColor: '#000000',
                        },
                        '& .fc-day-sat .fc-daygrid-day-number': {
                            color: '#1976d2',
                        },
                        '& .fc-day-sun .fc-daygrid-day-number': {
                            color: '#d32f2f',
                        },
                    }}
                >
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin,listPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,listMonth'
                        }}
                        locales={[jaLocale]}
                        locale='ja'
                        initialView='dayGridMonth'
                        editable={true}
                        dayHeaderFormat={{ weekday: 'narrow' }}
                        titleFormat={{ year: 'numeric', month: 'long' }}
                        height="auto"
                        aspectRatio={1.8}
                        events={events}
                        eventDisplay="block"
                        eventTimeFormat={{
                            hour: '2-digit',
                            minute: '2-digit',
                            meridiem: false
                        }}
                    />
                </Box>
            </Container>
        </Paper>
    )
}