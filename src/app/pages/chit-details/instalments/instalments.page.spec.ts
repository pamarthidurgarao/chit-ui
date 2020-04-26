import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstalmentsPage } from './instalments.page';

describe('InstalmentsPage', () => {
  let component: InstalmentsPage;
  let fixture: ComponentFixture<InstalmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstalmentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstalmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
