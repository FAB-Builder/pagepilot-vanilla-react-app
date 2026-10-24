import HomeHero from './home/HomeHero';
import ModuleGroup from './home/ModuleGroup';
import HomeResources from './home/HomeResources';
import { HOME_GROUPS, HOME_RESOURCES } from './home/homeData';

function Home() {
  return (
    <div className="pb-16">
      <HomeHero />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {HOME_GROUPS.map((group) => (
          <ModuleGroup key={group.title} group={group} />
        ))}
        <HomeResources items={HOME_RESOURCES} />
      </div>
    </div>
  );
}

export default Home;
