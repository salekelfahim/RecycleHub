import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCoComponent } from './sidebar-co.component';

describe('SidebarCoComponent', () => {
  let component: SidebarCoComponent;
  let fixture: ComponentFixture<SidebarCoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarCoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
