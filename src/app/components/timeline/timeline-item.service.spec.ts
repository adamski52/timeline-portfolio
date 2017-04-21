import {TestBed, inject} from '@angular/core/testing';
import {TimelineItemService} from "./timeline-item.service";
import {TickerService} from "../../services/ticker.service";
import {Injectable} from "@angular/core";

@Injectable()
class MockTickerService {
    public callback;
    public start(ms:number, handler:(value:any) => void) {
        this.callback = handler;
    }

    public tick() {
        this.callback();
    }

    public stop(interval:number) {}
}

describe('TimelineItemService', () => {

    let title:string,
        service:TimelineItemService,
        letters:string[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TimelineItemService,
                {
                    provide: TickerService,
                    useClass: MockTickerService
                }
            ]
        });
    });

    it('should have a public setter which broadcasts to subscribers', inject([TickerService], (mockTicker:MockTickerService) => {
        service = TestBed.get(TimelineItemService);

        service.subscribe("wat", true, (t:string) => {
            title = t;
        });

        service.setTitle("lol");
        mockTicker.tick();
        mockTicker.tick();
        mockTicker.tick();
        mockTicker.tick();

        expect(title).toEqual("lol");
    }));

    it('should have a reset which broadcasts the original title', inject([TickerService], (mockTicker:MockTickerService) => {
        service = TestBed.get(TimelineItemService);

        service.subscribe("wat", true, (t:string) => {
            title = t;
        });

        service.setTitle("lol");
        mockTicker.tick();
        mockTicker.tick();
        mockTicker.tick();
        mockTicker.tick();
        expect(title).toEqual("lol");
        service.reset();
        mockTicker.tick();
        mockTicker.tick();
        mockTicker.tick();
        mockTicker.tick();
        expect(title).toEqual("wat");
    }));

    it("should scramble the entire word", inject([TickerService], (mockTicker:MockTickerService) => {
        service = TestBed.get(TimelineItemService);

        service.subscribe("wat", true, (t:string) => {
            title = t;
        });

        service.setTitle("lol");

        mockTicker.tick();

        letters = title.split("");
        expect(letters.length).toEqual(3);
        expect(letters[0]).not.toEqual("l");
        expect(letters[1]).not.toEqual("o");
        expect(letters[2]).not.toEqual("l");
    }));

    it("should unscramble letter by letter word, left to right if even", inject([TickerService], (mockTicker:MockTickerService) => {
        service = TestBed.get(TimelineItemService);

        service.subscribe("lol", false, (t:string) => {
            title = t;
        });

        service.setTitle("wat");

        mockTicker.tick();
        letters = title.split("");
        expect(letters[0]).not.toEqual("w");
        expect(letters[1]).not.toEqual("a");
        expect(letters[2]).not.toEqual("t");

        mockTicker.tick();
        letters = title.split("");
        expect(letters[0]).toEqual("w");
        expect(letters[1]).not.toEqual("a");
        expect(letters[2]).not.toEqual("t");

        mockTicker.tick();
        letters = title.split("");
        expect(letters[0]).toEqual("w");
        expect(letters[1]).toEqual("a");
        expect(letters[2]).not.toEqual("t");

        mockTicker.tick();
        letters = title.split("");
        expect(letters[0]).toEqual("w");
        expect(letters[1]).toEqual("a");
        expect(letters[2]).toEqual("t");
    }));

    it("should unscramble letter by letter, right to left if not even", inject([TickerService], (mockTicker:MockTickerService) => {
        service = TestBed.get(TimelineItemService);

        service.subscribe("lol", true, (t:string) => {
            title = t;
        });

        service.setTitle("wat");

        mockTicker.tick();
        letters = title.split("");
        expect(letters[0]).not.toEqual("w");
        expect(letters[1]).not.toEqual("a");
        expect(letters[2]).not.toEqual("t");

        mockTicker.tick();
        letters = title.split("");
        expect(letters[0]).not.toEqual("w");
        expect(letters[1]).not.toEqual("a");
        expect(letters[2]).toEqual("t");

        mockTicker.tick();
        letters = title.split("");
        expect(letters[0]).not.toEqual("w");
        expect(letters[1]).toEqual("a");
        expect(letters[2]).toEqual("t");

        mockTicker.tick();
        letters = title.split("");
        expect(letters[0]).toEqual("w");
        expect(letters[1]).toEqual("a");
        expect(letters[2]).toEqual("t");
    }));

    it("should scramble letters for letters only", inject([TickerService], (mockTicker:MockTickerService) => {
        let alphabet:string = "abcdefghijklmnopqtstuvwxyz";

        service = TestBed.get(TimelineItemService);

        service.subscribe("lol", true, (t:string) => {
            title = t;
        });

        service.setTitle(alphabet);

        for(let i = 0; i < alphabet.length; i++) {
            mockTicker.tick();
        }
        letters = title.split("");

        for(let i = 0; i < alphabet.length; i++) {
            expect(alphabet.indexOf(letters[i])).toBeGreaterThan(-1);
        }
    }));


    it("should scramble numbers for numbers only", inject([TickerService], (mockTicker:MockTickerService) => {
        let numbers:string = "1234567890";

        service = TestBed.get(TimelineItemService);

        service.subscribe("lol", true, (t:string) => {
            title = t;
        });

        service.setTitle(numbers);

        for(let i = 0; i < numbers.length; i++) {
            mockTicker.tick();
        }
        letters = title.split("");

        for(let i = 0; i < numbers.length; i++) {
            expect(numbers.indexOf(letters[i])).toBeGreaterThan(-1);
        }
    }));

    it("should not scramble anything else", inject([TickerService], (mockTicker:MockTickerService) => {
        let numbers:string = "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/';";

        service = TestBed.get(TimelineItemService);

        service.subscribe("lol", true, (t:string) => {
            title = t;
        });

        service.setTitle(numbers);
21
        for(let i = 0; i < numbers.length; i++) {
            mockTicker.tick();
        }
        letters = title.split("");

        for(let i = 0; i < numbers.length; i++) {
            expect(numbers.indexOf(letters[i])).toBeGreaterThan(-1);
        }
    }));
});
