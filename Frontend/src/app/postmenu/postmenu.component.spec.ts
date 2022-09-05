import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmenuComponent } from './postmenu.component';

describe('PostmenuComponent', () => {
  let component: PostmenuComponent;
  let fixture: ComponentFixture<PostmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
