// App.js
import { IntlMessageFormat } from 'intl-messageformat';
import React, { useEffect, useState } from 'react';
import { FormattedDate, FormattedMessage, FormattedNumber, IntlProvider, } from 'react-intl';
import enMessages from './locales/en.json';
import viMessages from './locales/vi.json';

const messages = {
  en: enMessages,
  vi: viMessages,
};

const App = () => {
  const [locale, setLocale] = useState('en');

  const handleChangeLocale = (e) => {
    setLocale(e.target.value);
  };

  const onClickRandom = () => {
    const ramdomNumber =    Math.round(Math.random() * 100)
    const messages = {
      en: {
        greeting: 'Hello, {name}!',
        amount: 'You have {count, plural, =0 {no messages} one {1 message} other {{count} messages}}.'
      },
      vi: {
        greeting: 'Xin chào, {name}!',
        amount: 'Bạn có {count, plural, =0 {không có tin nhắn} one {1 tin nhắn} other {{count} tin nhắn}}.'
      },
    };
    const greetingMsg = messages[locale].greeting;
    const amountMsg = messages[locale].amount;
    const data = {
      name: 'John',
      count: ramdomNumber
    };
    const greetingFormatter = new IntlMessageFormat(greetingMsg, locale);
    const amountFormatter = new IntlMessageFormat(amountMsg, locale);
    const formattedGreeting = greetingFormatter.format(data);
    const formattedAmount = amountFormatter.format(data);
    console.log(formattedGreeting); // Output: Hello, John!
    console.log(formattedAmount); // Output: You have 5 messages.
 
  }

  const onClickDateFormat = () => {
    const date = new Date();

    const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });
    const formattedDate = dateFormatter.format(date);
    console.log('Formatted Date:', formattedDate);

    // Phương thức formatDateToParts
    const dateFormatterParts = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });
    const formattedDateParts = dateFormatterParts.formatToParts(date);
    console.log('Formatted Date Parts:', formattedDateParts);

    // Phương thức formatTime
    const timeFormatter = new Intl.DateTimeFormat(locale, { timeStyle: 'short', hourCycle: 'h12' });
    const formattedTime = timeFormatter.format(date);
    console.log('Formatted Time:', formattedTime);

    // Phương thức formatTimeToParts
    const timeFormatterParts = new Intl.DateTimeFormat(locale, { timeStyle: 'long' });
    const formattedTimeParts = timeFormatterParts.formatToParts(date);
    console.log('Formatted Time Parts:', formattedTimeParts);
  }

  const displayList = () => {
    const listFormatter = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' });

    const items = ['apple', 'banana', 'orange'];

    const formattedList = listFormatter.format(items);

    console.log(formattedList); // Output: "apple, banana, and orange"
  }
  const onClickDisplayName = () => {
    const regionNames = new Intl.DisplayNames(locale, { type: 'region' });
    console.log("region US:", regionNames.of('US'));
    console.log("region GB:", regionNames.of('GB'));
    console.log("region FR:", regionNames.of('FR'));
    console.log("region VI:", regionNames.of('VI'));

    const languageNames = new Intl.DisplayNames(locale, { type: 'language' });
    console.log('Language en:', languageNames.of('en'));
    console.log('Language fr:', languageNames.of('fr'));
    console.log('Language de:', languageNames.of('de'));
    console.log('Language vi:', languageNames.of('vi'));

    const currencyNames = new Intl.DisplayNames(locale, { type: "currency" });
    console.log('Currentcy USD:', currencyNames.of('USD'));
    console.log('Currentcy EUR:', currencyNames.of("EUR"));
    console.log('Currentcy CNY:', currencyNames.of("CNY"));
    console.log('Currentcy VND:', currencyNames.of("VND"));


    const scriptNames = new Intl.DisplayNames(locale, { type: "script" });
    // Get script names
    console.log(scriptNames.of("Latn"));
    console.log(scriptNames.of("Arab"));
    console.log(scriptNames.of("Kana"));


    const calendarName = new Intl.DisplayNames(locale, { type: "calendar" });
    console.log(calendarName.of("roc"));
    console.log(calendarName.of("gregory"));
    console.log(calendarName.of("chinese"));

    const dateTimeF = new Intl.DisplayNames(locale, { type: "dateTimeField" });
    console.log(dateTimeF.of("era"));
    console.log(dateTimeF.of("year"));
    console.log(dateTimeF.of("month"));
    console.log(dateTimeF.of("quarter"));
    console.log(dateTimeF.of("weekOfYear"));
    console.log(dateTimeF.of("weekday"));
    console.log(dateTimeF.of("dayPeriod"));
    console.log(dateTimeF.of("day"));
    console.log(dateTimeF.of("hour"));
    console.log(dateTimeF.of("minute"));
    console.log(dateTimeF.of("second"));


    // const durationFormat = new Intl.DurationFormat(locale, {
    //   style: 'long', // or 'short', 'narrow'
    //   // Units you want to include in the formatted output
    //   // Available units: years, months, weeks, days, hours, minutes, seconds
    //   units: ['years', 'months', 'days', 'hours', 'minutes', 'seconds']
    // });
    
    // const duration = {
    //   years: 1,
    //   months: 2,
    //   days: 15,
    //   hours: 5,
    //   minutes: 30,
    //   seconds: 45
    // };
    
    // const formattedDuration = durationFormat.format(duration);

    const enCardinalRules = new Intl.PluralRules("en-US");
console.log(enCardinalRules.select(0)); // "other"
console.log(enCardinalRules.select(1)); // "one"
console.log(enCardinalRules.select(2)); // "other"

  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div style={{margin: '40px'}}>
        <h1>
          <FormattedMessage id="app.title" />
        </h1>
        <label>
          <FormattedMessage id="app.language" />:
          <select value={locale} onChange={handleChangeLocale}>
            <option value="en">English</option>
            <option value="vi">Vietnamese</option>
          </select>
        </label>
        <div>
          <p>
            <FormattedMessage
              id="app.welcome"
              values={{ name: 'John' }}
            />
          </p>
          <p>
            <FormattedNumber value={10000} style="currency" currency="USD" />
          </p>
          <p>
            <FormattedNumber value={600000} style="currency" currency="VND" />
          </p>
          <p>
            <FormattedNumber value={10000} style="currency" currency="EUR" />
          </p>
          <p>
            <FormattedDate
              value={new Date()}
              year="numeric"
              month="long"
              day="numeric"
            />
          </p>
        </div>


        {/* <div>
          <FormattedMessage id="greeting" defaultMessage="Hello, World!" />
          <FormattedMessage id="amount" defaultMessage="You have {count} messages." values={{ count: 5 }} />
        </div> */}

        <button onClick={onClickRandom}>
          <FormattedMessage id="app.random" />
        </button>
        <button onClick={onClickDateFormat}>Date format</button>
        <button onClick={displayList}>List format</button>
        <button onClick={onClickDisplayName}>Display name</button>
      </div>
    </IntlProvider>
  );
};

export default App;
