import { Injectable, signal } from '@angular/core';

export interface Review {
    id: number;
    name: string;
    text: string;
    date: string;
}

@Injectable({
    providedIn: 'root'
})
export class TestimonialsService {
    reviews = signal<Review[]>([
        {
            id: 1,
            name: 'Davis Kamau',
            text: 'I was hesitant to trust anyone with my new Land Cruiser, but the team at Auto Care Towing was exceptional. They used a specialized flatbed and handled my vehicle with white-glove care. Highly recommended for premium vehicles.',
            date: 'Aug 15, 2021'
        },
        {
            id: 2,
            name: 'Intex Construction',
            text: 'We rely on Auto Care for transporting our heavy construction machinery and farm equipment. They are reliable, timely, and have the right trucks for heavy loads.',
            date: 'March 02, 2025'
        },
        {
            id: 3,
            name: 'Sarah Nungari - Fleet Manager, Magari Imports',
            text: 'Reliability is key for our business. Auto Care Towing handles our fleet movements and dealership deliveries with absolute precision. They are punctual, professional, and their trucks are always clean and well-maintained',
            date: 'Nov 20, 2023'
        },
        {
            id: 4,
            name: 'Otieno Kelvin',
            text: 'I am very particular about who handles my cars. Auto Care Towing transported my Nissan GT-R to the track, and the service was flawless. The driver knew exactly how to load a low-clearance vehicle without a scratch. Truly professional.',
            date: 'July 20, 2022'
        }
    ]);
}
