import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
    providedIn: "root"
})
export class GeneralService { 
    isMobile: boolean;
    darkMode: boolean = false;
    user: User;

    getCleanDBDate(date: string): string {
        return date.replace('T', ' ')
    }

    dayISO(d: Date): string {
        return d.getFullYear() + '-' + this.monthWithLeadingZero(d) + '-' + this.dayWithLeadingZero(d) + ' 00:00:00';
    } 

    dayWithLeadingZero(d: Date) { 
        return (d.getDate() < 10 ? '0' : '') + d.getDate();
    }

    monthWithLeadingZero(d: Date) { 
        return ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    }

    hourWithLeadingZero(d: Date) { 
        return (d.getHours() < 10 ? '0' : '') + d.getHours();
    }

    minuteWithLeadingZero(d: Date) { 
        return (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    }

    secondWithLeadingZero(d: Date) { 
        return (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    }
}