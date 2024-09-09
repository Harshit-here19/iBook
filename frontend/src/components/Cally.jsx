import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import "cally";

function useListener(ref, event, listener) {
  useEffect(() => {
    const current = ref.current;

    if (current && listener) {
      current.addEventListener(event, listener);
      return () => current.removeEventListener(event, listener);
    }
  }, [ref, event, listener]);
}

function useProperty(ref, prop, value) {
  useEffect(() => {
    if (ref.current) {
      ref.current[prop] = value;
    }
  }, [ref, prop, value]);
}

export const CalendarMonth = forwardRef(function CalendarMonth(
  props,
  forwardedRef
) {
  return <calendar-month offset={props.offset} ref={forwardedRef} />;
});

export const CalendarRange = forwardRef(function CalendarRange(
  { onChange, showOutsideDays, firstDayOfWeek, isDateDisallowed, ...props },
  forwardedRef
) {
  const ref = useRef();
  useImperativeHandle(forwardedRef, () => ref.current, []);
  useListener(ref, "change", onChange);
  useProperty(ref, "isDateDisallowed", isDateDisallowed);

  return (
    <calendar-range
      ref={ref}
      show-outside-days={showOutsideDays || undefined}
      first-day-of-week={firstDayOfWeek}
      {...props}
    />
  );
});

export const CalendarMulti = forwardRef(function CalendarMulti(
  { onChange, showOutsideDays, firstDayOfWeek, isDateDisallowed, ...props },
  forwardedRef
) {
  const ref = useRef();
  useImperativeHandle(forwardedRef, () => ref.current, []);
  useListener(ref, "change", onChange);
  useProperty(ref, "isDateDisallowed", isDateDisallowed);

  return (
    <calendar-multi
      ref={ref}
      show-outside-days={showOutsideDays || undefined}
      first-day-of-week={firstDayOfWeek}
      {...props}
    >
      <svg
        aria-label="Previous"
        slot="previous"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="svg"
      >
        <path d="M15 18L9 12L15 6"></path>
      </svg>
      <svg
        aria-label="Next"
        slot="next"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="svg"
      >
        <path d="M8 5l7 7-7 7"></path>
      </svg>
      {props.children}
    </calendar-multi>
  );
});

export const CalendarDate = forwardRef(function CalendarDate(
  { onChange, showOutsideDays, firstDayOfWeek, isDateDisallowed, ...props },
  forwardedRef
) {
  const ref = useRef();
  useImperativeHandle(forwardedRef, () => ref.current, []);
  useListener(ref, "change", onChange);
  useProperty(ref, "isDateDisallowed", isDateDisallowed);

  return (
    <calendar-date
      ref={ref}
      show-outside-days={showOutsideDays || undefined}
      first-day-of-week={firstDayOfWeek}
      {...props}
    />
  );
});
