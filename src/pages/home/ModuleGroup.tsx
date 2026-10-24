import type { HomeGroup } from './homeData';
import ModuleCard from './ModuleCard';

function ModuleGroup({ group }: { group: HomeGroup }) {
  return (
    <section className="py-12 sm:py-14">
      <div className="mb-7">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">{group.title}</h2>
        <p className="mt-1.5 text-[15px] text-muted">{group.blurb}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((item) => (
          <ModuleCard key={item.to} item={item} />
        ))}
      </div>
    </section>
  );
}

export default ModuleGroup;
