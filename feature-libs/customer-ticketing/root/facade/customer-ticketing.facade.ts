import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CUSTOMER_TICKETING_FEATURE } from '../feature-name';
import {
  AssociatedObject,
  Category,
  TicketDetails,
  TicketEvent,
} from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CustomerTicketingFacade,
      feature: CUSTOMER_TICKETING_FEATURE,
      methods: [
        'getTicketState',
        'getTicket',
        'createTicketEvent',
        'getTicketCategoriesState',
        'getTicketCategories',
        'getTicketAssociatedObjectsState',
        'getTicketAssociatedObjects',
        'uploadAttachment',
      ],
    }),
})
export abstract class CustomerTicketingFacade {
  abstract getTicketState(): Observable<QueryState<TicketDetails | undefined>>;

  abstract getTicket(): Observable<TicketDetails | undefined>;

  abstract getTicketCategoriesState(): Observable<QueryState<Category[]>>;

  abstract getTicketCategories(): Observable<Category[]>;

  abstract getTicketAssociatedObjectsState(): Observable<
    QueryState<AssociatedObject[]>
  >;

  abstract getTicketAssociatedObjects(): Observable<AssociatedObject[]>;

  abstract createTicketEvent(
    ticketEvent: TicketEvent
  ): Observable<TicketEvent | unknown>;

  abstract uploadAttachment(
    file: File | null,
    eventCode: string
  ): Observable<unknown>;

  abstract downloadAttachment(
    eventCode: string,
    attachmentId: string
  ): Observable<unknown>;
}
