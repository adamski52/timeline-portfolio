import {TestBed, inject} from '@angular/core/testing';
import {TimelineDateService} from "./timeline-date.service";
import {IDate} from "../../../interfaces/date";

describe('TimelineDateService', () => {
    let months:string[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TimelineDateService
            ]
        });
    });

    it("should accept a date format", inject([TimelineDateService], (service:TimelineDateService) => {
        let input:Date = new Date(1970, 0, 1),
            output:IDate = service.getDate(input);

        expect(output.month).toEqual("JAN");
        expect(output.date).toEqual("01");
        expect(output.year).toEqual("1970");
    }));

    it("should accept a number format", inject([TimelineDateService], (service:TimelineDateService) => {
        let input:number = new Date(1970, 0, 1).getTime(),
            output:IDate = service.getDate(input);

        expect(output.month).toEqual("JAN");
        expect(output.date).toEqual("01");
        expect(output.year).toEqual("1970");
    }));

    it("should accept a timestamp (string) format", inject([TimelineDateService], (service:TimelineDateService) => {
        let input:string = new Date(1970, 0, 1).toString(),
            output:IDate = service.getDate(input);

        expect(output.month).toEqual("JAN");
        expect(output.date).toEqual("01");
        expect(output.year).toEqual("1970");
    }));

    for (let i = 0; i < 12; i++) {
        it("should use '" + months[i] + "' for month = " + i, inject([TimelineDateService], (service:TimelineDateService) => {
            let input:Date = new Date(1970, i, 1),
                output:IDate = service.getDate(input);

            expect(output.month).toEqual(months[i]);
        }));
    }

    for (let i = 1; i < 10; i++) {
        it("should pad " + i + " to 0" + i, inject([TimelineDateService], (service:TimelineDateService) => {
            let input:Date = new Date(1970, 0, i),
                output:IDate = service.getDate(input);

            expect(output.date).toEqual("0"+i);
        }));
    }


    for (let i = 10; i <= 31; i++) {
        it("should not pad " + i, inject([TimelineDateService], (service: TimelineDateService) => {
            let input:Date = new Date(1970, 0, i),
                output:IDate = service.getDate(input);

            expect(output.date).toEqual(i+"");
        }));
    }
});
