function CategoryFilter({ categories, selectedCategory, onSelect }) {
  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Browse prompts</p>
          <h2>Category filter</h2>
        </div>
      </div>

      <div className="chip-row" role="tablist" aria-label="Prompt categories">
        <button
          type="button"
          className={`chip ${selectedCategory === 'All' ? 'chip-active' : ''}`}
          onClick={() => onSelect('All')}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`chip ${selectedCategory === category ? 'chip-active' : ''}`}
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryFilter;
