it("should accept a date format", () => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.date = new Date(1984, 4, 24);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();

    expect(component.date).toEqual("24");
    expect(component.month).toEqual("MAY");
});

it("should accept a number format", () => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.date = 454219200000;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();

    expect(component.date).toEqual("24");
    expect(component.month).toEqual("MAY");
});

it("should accept a timestamp format", () => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.date = "1984-05-24T08:31:00Z";
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();

    expect(component.date).toEqual("24");
    expect(component.month).toEqual("MAY");
});

for(let i = 0; i < 12; i++) {
    it("should use the 3 letter month abbreviation for month = " + i, () => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.date = new Date(1984, i, 1);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        expect(component.month).toEqual(months[i]);
    });
}

for(let i = 1; i < 10; i++) {
    it("should pad " + i, () => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.date = new Date(1984, 4, i);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        expect(component.date).toEqual("0" + i);
    });
}


for(let i = 10; i <= 31; i++) {
    it("should not pad " + i, () => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.date = new Date(1984, 4, i);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        expect(component.date).toEqual(i+"");
    });
}
