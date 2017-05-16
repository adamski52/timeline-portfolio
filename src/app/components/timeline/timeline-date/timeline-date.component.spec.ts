import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {Component, Injectable} from "@angular/core";
import {TimelineDateComponent} from "./timeline-date.component";
import {TimelineDateService} from "./timeline-date.service";
import {IDate} from "../../../interfaces/date";


@Injectable()
class MockTimelineDateService {
    public getDate(date:string|Date|number):IDate {
        return {
            month: "JAN",
            date: "01",
            year: "1970"
        };
    }
}

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-date [date]="date"></jna-timeline-date>`
})
class TestComponent {
    public date:Date|string|number = new Date();
}

fdescribe('TimelineDateComponent', () => {
    let component:TimelineDateComponent,
        fixture:ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TimelineDateComponent
            ],
            providers: [
                {
                    provide: TimelineDateService,
                    useClass: MockTimelineDateService
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
    }));

    it('should set its month based on the input date', () => {
        fixture.componentInstance.date =
    });
});
