import { ComponentFixture, TestBed } from '@angular/core/testing';
import { small, medium, large } from './avatar.component';
import { AvatarComponent } from './avatar.component';
import { describe, beforeEach, it } from 'vitest';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct uppercase initials', () => {
    component.firstName = 'John';
    component.lastName = 'Doe';
    expect(component.initials).toBe('JD');
  });

  it('should handle single character names', () => {
    component.firstName = 'A';
    component.lastName = 'B';
    expect(component.initials).toBe('AB');
  });

  it('should render the expected initials in the div text content', () => {
    component.firstName = 'John';
    component.lastName = 'Doe';
    fixture.detectChanges();
    const divElement: HTMLElement = fixture.nativeElement.querySelector('.avatar');
    expect(divElement.textContent?.trim()).toBe('JD');
  });

  it('should have the background color set to #0a66c2', () => {
    expect(component.backgroundColor).toBe('#0a66c2');
  });

  it('should return correct dimensions for small size', () => {
    component.sizeStyles = 'small';
    expect(component.sizeStylesDimensions).toEqual({ fontSize: `${small}px` });
  });

  it('should return correct dimensions for medium size', () => {
    component.sizeStyles = 'medium';
    expect(component.sizeStylesDimensions).toEqual({ fontSize: `${medium}px` });
  });

  it('should return correct dimensions for large size', () => {
    component.sizeStyles = 'large';
    expect(component.sizeStylesDimensions).toEqual({ fontSize: `${large}px` });
  });

  it('should fall back to medium dimensions for an unknown size', () => {
    component.sizeStyles = 'giant';
    expect(component.sizeStylesDimensions).toEqual({ fontSize: `${medium}px` });
  });
});
