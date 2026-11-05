export default function CleaningOptionsDetails() {
  return (
    <>
      <p className="crown-supplies-note">
        <span aria-hidden="true">✦</span>
        Crown brings its own cleaning supplies.
      </p>

      <div className="crown-cleaning-includes">
        <div>
          <span className="crown-cleaning-includes-label">Compare what’s included</span>
          <h2>Cleaning checklist</h2>
        </div>
        <div
          className="crown-cleaning-table-scroll"
          role="region"
          aria-label="Light and Deep Cleaning task comparison"
          tabIndex={0}
        >
          <table className="crown-cleaning-table">
            <caption className="sr-only">
              Tasks included with Light Cleaning and Deep Cleaning
            </caption>
            <thead>
              <tr>
                <th scope="col">Service</th>
                <th scope="col">Light Cleaning</th>
                <th scope="col">Deep Cleaning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="crown-cleaning-table-group"><th scope="rowgroup" colSpan={3}>Bathroom area</th></tr>
              <tr><th scope="row">Bath and shower</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Toilet</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Sinks</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Mirror</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Vacuum all carpeted areas</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Take out trash and replace liners</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr className="crown-cleaning-table-group"><th scope="rowgroup" colSpan={3}>Dust all areas</th></tr>
              <tr><th scope="row">Furniture surfaces</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Light fixtures</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Ceiling fans</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Sweeping</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Mopping</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr className="crown-cleaning-table-group"><th scope="rowgroup" colSpan={3}>Kitchen area</th></tr>
              <tr><th scope="row">Clean sink area</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Outside of kitchen cabinets</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Clean stove</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Countertops</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Wipe down outside of appliances</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr className="crown-cleaning-table-group"><th scope="rowgroup" colSpan={3}>Clean inside of appliances</th></tr>
              <tr><th scope="row">Microwave</th><td><span aria-label="Included">✓</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Refrigerator</th><td><span aria-label="Not included">—</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Dishwasher</th><td><span aria-label="Not included">—</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Oven</th><td><span aria-label="Not included">—</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Clean windows and window sills</th><td><span aria-label="Not included">—</span></td><td><span aria-label="Included">✓</span></td></tr>
              <tr><th scope="row">Baseboards</th><td><span aria-label="Not included">—</span></td><td><span aria-label="Included">✓</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="crown-cleaning-addons">
        <strong>Not included, but available by request</strong>
        <span>Laundry</span>
        <span>Patio sweeping</span>
        <span>Walls</span>
        <span>Garage cleaning</span>
        <span>Carpet cleaning</span>
      </div>
    </>
  );
}
