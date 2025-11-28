export const dynamic = "force-dynamic";
// app/shelters/page.tsx
export default function SheltersPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Shelter & Rescue Directory
          </h1>
          <p className="text-xl text-text-muted font-body2">
            Discover amazing organizations saving dogs across the nation
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-surface rounded-2xl p-6 shadow-lg border border-border mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-body2 font-medium text-text mb-2">
                Search Shelters
              </label>
              <input
                type="text"
                placeholder="Enter shelter name..."
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
              />
            </div>
            <div>
              <label className="block text-sm font-body2 font-medium text-text mb-2">
                State
              </label>
              <select className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text">
                <option value="">All States</option>
                <option value="ca">California</option>
                <option value="ny">New York</option>
                <option value="tx">Texas</option>
                <option value="fl">Florida</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-body2 font-medium text-text mb-2">
                &nbsp;
              </label>
              <button className="w-full bg-buttons text-surface py-3 rounded-xl font-heading font-semibold hover:opacity-90 transition-all">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Shelters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Shelter Card 1 */}
          <div className="bg-surface rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-heading font-semibold text-primary mb-2">
              Happy Tails Rescue
            </h3>
            <p className="text-text-muted mb-3">Los Angeles, CA</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-primary font-semibold">
                24 dogs registered
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <a
              href="#"
              className="text-buttons hover:underline text-sm font-medium"
            >
              Visit Website →
            </a>
          </div>

          {/* Shelter Card 2 */}
          <div className="bg-surface rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-heading font-semibold text-primary mb-2">
              Paws for Life
            </h3>
            <p className="text-text-muted mb-3">Austin, TX</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-primary font-semibold">
                18 dogs registered
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <a
              href="#"
              className="text-buttons hover:underline text-sm font-medium"
            >
              Visit Website →
            </a>
          </div>

          {/* Shelter Card 3 */}
          <div className="bg-surface rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-heading font-semibold text-primary mb-2">
              Second Chance Shelter
            </h3>
            <p className="text-text-muted mb-3">Chicago, IL</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-primary font-semibold">
                15 dogs registered
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <a
              href="#"
              className="text-buttons hover:underline text-sm font-medium"
            >
              Visit Website →
            </a>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-surface rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
              Is your shelter missing?
            </h2>
            <p className="text-text-muted mb-6 max-w-2xl mx-auto">
              When you register your rescue dog with World Canine Union, your
              shelter automatically gets added to our directory. Help us
              recognize the amazing work they do!
            </p>
            <a
              href="/register"
              className="bg-buttons text-surface px-8 py-4 rounded-xl font-heading font-semibold hover:opacity-90 transition-all inline-block"
            >
              Register Your Dog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
