currFilterState.push({
  and: [
    {
      key: 'email',
      comparator: 'includes',
      values: ['@lightcast.io', '@streak.com'],
      operator: 'or',
    },
    {
      key: 'hasDoneSomething',
      comparator: '=',
      values: [false],
      operator: 'and',
    },
  ],
});

const Jet = () => (
  <>
    {filter !== null &&
      comparator === null &&
      filter.validComparators.map((currComparator) => (
        <li
          key={currComparator}
          onKeyDown={(event) => {
            // TODO: implement this
            console.log({ target: event.target });
          }}
          onClick={(event) => {
            console.log({
              clickCurrTarget: event.currentTarget.textContent,
            });
            const newComparator = filter.validComparators.find(
              (filterComparator) =>
                filterComparator === event.currentTarget.textContent,
            );
            setComparator(newComparator ?? null);
            setOpen(false);
          }}
        >
          {currComparator}
        </li>
      ))}
  </>
);
