import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarRequestsService } from '../../../services/calendar-requests.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = ({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    initialView: 'dayGridMonth',
    events: [],
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: esLocale,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  });

  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef, private calendarRequestsService: CalendarRequestsService) {
  }

  ngOnInit() {
    this.calendarRequestsService.obtenerSolicitudesCalendario().subscribe(
      (data: any[]) => {
        const eventos = data.map(evento => ({
          id: evento.id,
          title: evento.profesor,
          description: evento.equipos_solicitados,
          start: evento.fecha_evento,
          end: evento.fecha_evento,
        }))
        console.log(eventos)

        this.calendarOptions.events = eventos
      },
      (error) => {
        console.error(error);
      }
    );
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // borra evento en la fecha del calendario

  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`El evento "${clickInfo.event.title}" será borrado de forma definitiva`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }
}