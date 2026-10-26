import HomeHero from './home/HomeHero';
import ModuleGroup from './home/ModuleGroup';
import HomeResources from './home/HomeResources';import { HOME_GROUPS, HOME_RESOURCES } from './home/homeData';
import { HOME_CONTAINER } from '../components/layoutClasses';

function Home() {
  return (
    <div className="pb-16">
      <HomeHero />
      <div className={HOME_CONTAINER}>
        {HOME_GROUPS.map((group) => (
          <ModuleGroup key={group.title} group={group} />
        ))}
        <HomeResources items={HOME_RESOURCES} />
      </div>
    </div>
  );
}

export default Home;
