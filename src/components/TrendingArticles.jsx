const trending1 = "/assets/trending-1.jpg";
const trending2 = "/assets/trending-2.jpg";
const trending3 = "/assets/trending-3.jpg";
const trending4 = "/assets/trending-4.jpg";

const trendingArticles = [
  {
    id: 1,
    title:
      "US faces $9.4bn tourism loss from new $250 visa fee targeting African countries",
    image: trending1,
    content: `
      <p>The United States is projected to face a significant downturn in tourism revenue due to a newly announced $250 visa fee targeting travelers from African countries. Analysts estimate that this could cost the US tourism industry up to $9.4 billion annually.</p>

      <p>"This fee could discourage visitors from Africa, many of whom are frequent business and leisure travelers," said <strong>Mary Johnson</strong>, an economist specializing in international tourism.</p>

      <p>Tourism officials worry that the increased cost will lead to a decline in hotel bookings, guided tours, and airline ticket sales, particularly in cities like New York, Washington D.C., and Los Angeles.</p>

      <img src="${trending1}" alt="Tourists in New York" />
      <p>Several African countries have expressed concerns over the move, calling for a reassessment of the policy to protect mutual tourism interests.</p>
    `,
    timestamp: "5 hours ago",
  },
  {
    id: 2,
    title:
      "Construction begins on East Africa's first-ever cross-border SGR worth $2.15 billion",
    image: trending2,
    content: `
      <p>Construction has officially started on East Africa’s first-ever cross-border Standard Gauge Railway (SGR), a $2.15 billion project aimed at connecting Kenya, Uganda, and South Sudan. The railway is expected to revolutionize regional trade and travel.</p>

      <p>"This railway is a milestone for East Africa. It will drastically reduce transport time for goods and passengers," said <strong>Eng. Peter Mwangi</strong>, lead project engineer.</p>

      <img src="${trending2}" alt="East Africa SGR Construction" />
      <p>The SGR will feature modern train stations, high-speed cargo lines, and enhanced safety measures. Local communities are optimistic about the job opportunities and economic growth the project will bring.</p>

      <p>Government officials emphasize that this cross-border railway is part of a larger plan to integrate East African economies more closely.</p>
    `,
    timestamp: "8 hours ago",
  },
  {
    id: 3,
    title:
      "African Union pushes for new world map that reflects the continent's true size",
    image: trending3,
    content: `
      <p>The African Union (AU) has proposed a new global map design that reflects Africa’s actual size, aiming to correct the distortion caused by traditional Mercator projections.</p>

      <p>"Africa has always been bigger than most people think. It's time maps reflect reality," said <strong>AU Commissioner Amina Mohammed</strong> during a press briefing.</p>

      <img src="${trending3}" alt="African Continent Map" />
      <p>The initiative has sparked debates in cartography circles, as supporters argue that current maps misrepresent Africa's scale, affecting perceptions of the continent’s resources and geopolitical influence.</p>

      <p>The AU plans to release educational materials to encourage adoption of the new maps in schools worldwide.</p>
    `,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    title:
      "A human species unknown to scientists has been discovered in East Africa's oldest country",
    image: trending4,
    content: `
      <p>In a groundbreaking discovery, scientists have uncovered fossil evidence of a previously unknown human species in East Africa's oldest country. The findings could reshape our understanding of human evolution.</p>

      <p>"This discovery offers new insights into the diversity of early human species," said <strong>Dr. Samuel Okoro</strong>, lead researcher at the East Africa Paleoanthropology Institute.</p>

      <img src="${trending4}" alt="Fossil Discovery in East Africa" />
      <p>The fossils, including skull fragments and jawbones, are believed to be over 200,000 years old. Researchers are studying the remains to determine how this species interacted with other early humans.</p>

      <p>The discovery has drawn global attention and may lead to new archaeological expeditions in the region.</p>
    `,
    timestamp: "2 days ago",
  },
];


const TrendingArticles = () => {
  return (
    <div className="bg-sidebar-bg p-6 rounded-lg">
      <h3 className="news-sidebar-title">TRENDING</h3>
      <div className="space-y-6">
        {trendingArticles.map((article) => (
          <article key={article.id} className="news-trending-item">
            <div className="flex space-x-3">
              <img
                src={article.image}
                alt={article.title}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-headline-primary leading-tight hover:text-news-primary transition-colors cursor-pointer">
                  {article.title}
                </h4>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles;