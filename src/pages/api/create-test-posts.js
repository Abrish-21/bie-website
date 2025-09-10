import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Post from '../../models/Post';

// Helper function to create a URL-friendly slug
const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')       // Remove all non-word chars
    .replace(/--+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // The provided list of Pexels image URLs
    const pexelsImageUrls = [
      "https://images.pexels.com/photos/33388467/pexels-photo-33388467.jpeg",
      "https://images.pexels.com/photos/31219842/pexels-photo-31219842.jpeg",
      "https://images.pexels.com/photos/33425453/pexels-photo-33425453.jpeg",
      "https://images.pexels.com/photos/31093707/pexels-photo-31093707.jpeg",
      "https://images.pexels.com/photos/33667840/pexels-photo-33667840.jpeg",
      "https://images.pexels.com/photos/33116137/pexels-photo-33116137.jpeg",
      "https://images.pexels.com/photos/9437696/pexels-photo-9437696.jpeg",
      "https://images.pexels.com/photos/33760751/pexels-photo-33760751.jpeg"
    ];

    // Generate unique ObjectId-like strings for authors to satisfy the schema
    const authorIds = {
      'Alex Johnson': '60d0fe4f8b1c4c0001000001',
      'Jane Doe': '60d0fe4f8b1c4c0001000002',
      'David Smith': '60d0fe4f8b1c4c0001000003',
      'Samantha Lee': '60d0fe4f8b1c4c0001000004',
      'Kenji Tanaka': '60d0fe4f8b1c4c0001000005',
      'Mark Evans': '60d0fe4f8b1c4c0001000006',
      'Evelyn Chen': '60d0fe4f8b1c4c0001000007',
    };

    const postsToCreate = [
      {
        title: "The Future of Finance: AI in Trading",
        excerpt: "Exploring how artificial intelligence is revolutionizing stock market analysis and automated trading strategies.",
        content: `
          <p>Artificial intelligence is no longer a futuristic concept but a present-day reality in the financial sector. Machine learning algorithms can now process vast amounts of market data—including news headlines, social media sentiment, and trading volumes—in a fraction of the time it would take a human analyst. This capability allows for the identification of subtle patterns and correlations that are invisible to the naked eye.</p>
          <p>The primary benefit of AI in trading is its ability to execute trades with unprecedented speed and accuracy. Algorithmic trading systems can be programmed to react to market changes in milliseconds, capitalizing on fleeting opportunities that human traders simply cannot. This is particularly crucial in high-frequency trading, where being even a second faster can result in significant profits.</p>
          <p>Beyond speed, AI also brings a new level of risk management to the table. By analyzing historical data, AI models can predict potential market volatility and adjust trading strategies accordingly. This proactive approach helps to mitigate losses and protect portfolios from unexpected downturns. While not foolproof, it represents a major step forward from traditional, reactive risk-management techniques.</p>
          <p>However, the adoption of AI in finance is not without its challenges. There are concerns about the transparency of these black-box models, as it can be difficult to understand how and why an AI makes a particular decision. This lack of interpretability poses regulatory and ethical questions that the industry is still grappling with. Additionally, the increasing reliance on AI could lead to systemic risks if multiple algorithms behave in the same way during a market event, exacerbating a downturn.</p>
          <p>Despite these challenges, the trajectory is clear: AI will continue to play an increasingly dominant role in finance. It is reshaping everything from customer service chatbots to complex portfolio management, and its full potential has yet to be realized. Financial professionals of the future will need to work alongside these intelligent systems, leveraging their capabilities to provide superior value to clients.</p>
        `,
        imageUrl: pexelsImageUrls[0],
        category: "Technology",
        type: "latest", // Updated type
        tags: ["AI", "Finance", "Trading", "Technology"],
        author: {
          name: "Alex Johnson",
          profilePictureUrl: "https://randomuser.me/api/portraits/men/4.jpg",
        },
        authorId: authorIds['Alex Johnson'], // Updated authorId
        readTime: 5, // Updated to a number
        views: 1234,
        publishDate: new Date().toISOString(),
      },
      {
        title: "Market Watch: Q3 Earnings Report Summary",
        excerpt: "A quick look at the key takeaways from the latest quarterly earnings reports across major sectors.",
        content: `
          <p>The third quarter earnings season has concluded, revealing a mixed but generally resilient performance from major companies. Technology stocks, in particular, demonstrated robust growth, with several giants beating expectations thanks to continued demand for cloud computing and digital services.</p>
          <p>Retail, however, faced headwinds from persistent inflation and changing consumer spending habits. While some companies managed to surprise to the upside with strong inventory management, many reported cautious outlooks for the upcoming holiday season. This sector remains one to watch closely as economic conditions evolve.</p>
          <p>Energy companies posted strong results, benefiting from stabilized commodity prices and geopolitical factors. The sustained profitability in this sector has led to increased dividend payouts and share buyback programs, attracting attention from value investors. However, there is ongoing pressure to invest in sustainable energy sources, which could impact future capital expenditure.</p>
          <p>In conclusion, the market is showing a tale of two halves. While tech and energy are performing well, consumer-facing sectors are feeling the pinch. Investors are advised to remain selective and focus on companies with strong fundamentals and clear growth strategies.</p>
        `,
        imageUrl: pexelsImageUrls[1],
        category: "Finance",
        type: "latest", // Updated type
        tags: ["Market", "Earnings", "Stocks"],
        author: {
          name: "Jane Doe",
          profilePictureUrl: "https://randomuser.me/api/portraits/women/5.jpg",
        },
        authorId: authorIds['Jane Doe'], // Updated authorId
        readTime: 3, // Updated to a number
        views: 876,
        publishDate: new Date().toISOString(),
      },
      {
        title: "Opinion: Is Remote Work Here to Stay?",
        excerpt: "An exploration of the long-term viability of remote and hybrid work models in a post-pandemic world.",
        content: `
          <p>The pandemic forced a global experiment in remote work, and while many companies have embraced the flexibility, others are pushing for a return to the office. The debate over whether remote work is here to stay is not just about productivity, but about culture, creativity, and career development.</p>
          <p>Proponents of remote work point to increased employee satisfaction, reduced overhead costs, and a wider talent pool. Without geographical constraints, companies can hire the best candidate for the job, regardless of their location. This model also allows for a better work-life balance for many employees, leading to higher morale and reduced burnout.</p>
          <p>On the other hand, critics argue that in-person collaboration is essential for innovation and building a strong company culture. They believe that spontaneous interactions and shared physical spaces foster a sense of community and can lead to creative breakthroughs that are harder to achieve over video calls. There are also concerns about equity, as some roles and industries are not suited for remote work, which can create a divide between employees.</p>
          <p>Ultimately, the future of work will likely be a hybrid model that blends the best of both worlds. Companies will offer a mix of remote and in-office days, giving employees the flexibility they desire while preserving the benefits of in-person interaction. The key to success will be in creating clear policies and investing in technology that facilitates seamless collaboration, no matter where an employee is located.</p>
        `,
        imageUrl: pexelsImageUrls[2],
        category: "Workplace",
        type: "latest", // Updated type
        tags: ["Remote Work", "Workplace"],
        author: {
          name: "David Smith",
          profilePictureUrl: "https://randomuser.me/api/portraits/men/6.jpg",
        },
        authorId: authorIds['David Smith'], // Updated authorId
        readTime: 4, // Updated to a number
        views: 2150,
        publishDate: new Date().toISOString(),
      },
      {
        title: "Navigating the Crypto Crash: A Beginner's Guide",
        excerpt: "Demystifying the recent volatility in the cryptocurrency market and what it means for new investors.",
        content: `
          <p>The cryptocurrency market has experienced a significant downturn, leaving many investors with questions about its long-term viability. While this volatility can be alarming, it's a characteristic of this nascent and speculative asset class. For beginners, understanding the difference between short-term market noise and long-term trends is crucial.</p>
          <p>One of the key factors behind the recent crash is a combination of macroeconomic conditions, including rising interest rates and inflation. As central banks tighten monetary policy, riskier assets like crypto tend to see outflows. This is a normal market reaction and not necessarily a reflection of the underlying technology's value.</p>
          <p>Furthermore, the collapse of certain platforms and projects has eroded investor trust. It highlights the importance of due diligence: understanding what you're investing in, using secure wallets, and avoiding projects with unsustainable returns. The phrase "not your keys, not your coins" has never been more relevant, emphasizing the need for self-custody over reliance on third-party exchanges.</p>
          <p>For those looking to stay in the market, a long-term perspective is key. Diversifying your portfolio, investing only what you can afford to lose, and dollar-cost averaging can help mitigate risk during volatile periods. The foundational technology behind crypto—blockchain—continues to evolve and find new applications, suggesting that the underlying value remains strong despite price fluctuations.</p>
          <p>This period of market correction could also be seen as an opportunity for consolidation and building stronger, more sustainable projects. It separates genuine innovations from speculative bubbles, paving the way for a more mature and resilient ecosystem in the future.</p>
        `,
        imageUrl: pexelsImageUrls[3],
        category: "Finance",
        type: "latest", // Updated type
        tags: ["Crypto", "Blockchain", "Investing"],
        author: {
          name: "Samantha Lee",
          profilePictureUrl: "https://randomuser.me/api/portraits/women/7.jpg",
        },
        authorId: authorIds['Samantha Lee'], // Updated authorId
        readTime: 6, // Updated to a number
        views: 5432,
        publishDate: new Date().toISOString(),
      },
      {
        title: "Featured Article: The Rise of Renewable Energy in Asia",
        excerpt: "An in-depth look at how Asian nations are leading the global charge in renewable energy adoption.",
        content: `
          <p>Asia is rapidly becoming a powerhouse in the global renewable energy transition. Countries like China, India, and Vietnam are making massive investments in solar, wind, and hydroelectric power, driven by a combination of government policies, falling technology costs, and growing environmental concerns.</p>
          <p>China, in particular, has become the world's largest producer and consumer of renewable energy. Its ambitious targets and vast manufacturing capabilities have made it a leader in solar panel production, driving down costs for the entire world. This has created a virtuous cycle, where cheaper technology leads to greater adoption, which in turn drives further innovation and cost reductions.</p>
          <p>Beyond the economic and environmental benefits, this shift also has geopolitical implications. Nations that become energy independent through renewables can reduce their reliance on volatile global energy markets, strengthening their national security. This movement is not just about technology; it's about a fundamental restructuring of the global energy landscape.</p>
          <p>However, challenges remain, including the need to modernize power grids to handle intermittent renewable energy sources and the development of large-scale energy storage solutions. Despite these hurdles, the momentum is undeniable, and Asia's leadership is setting a new standard for the rest of the world to follow.</p>
        `,
        imageUrl: pexelsImageUrls[4],
        category: "Sustainability",
        type: "latest", // Updated type
        tags: ["Renewable Energy", "Asia", "Solar"],
        author: {
          name: "Kenji Tanaka",
          profilePictureUrl: "https://randomuser.me/api/portraits/men/8.jpg",
        },
        authorId: authorIds['Kenji Tanaka'], // Updated authorId
        readTime: 7, // Updated to a number
        views: 987,
        publishDate: new Date().toISOString(),
      },
      {
        title: "Exclusive: Inside the World of Quantum Computing",
        excerpt: "An exclusive interview with a leading quantum physicist on the future of computing and its potential impact.",
        content: `
          <p>Quantum computing has long been the stuff of science fiction, but it is now on the cusp of becoming a practical reality. I recently sat down with Dr. Anya Sharma, a pioneer in the field, to discuss where we are and what lies ahead.</p>
          <p>"The core difference is in how they store information," Dr. Sharma explained. "Classical computers use bits, which are either a 0 or a 1. Quantum computers use qubits, which can be a 0, a 1, or both at the same time. This 'superposition' allows them to perform calculations that are beyond the reach of even the most powerful supercomputers."</p>
          <p>The implications of this are staggering. Quantum computers could revolutionize drug discovery, materials science, and cryptography. For example, they could simulate complex molecular interactions to design new medicines, or break modern encryption codes in a matter of seconds. The potential for good is immense, but so is the potential for misuse.</p>
          <p>Dr. Sharma was quick to point out that we are still in the early stages. "We're not going to see a quantum computer on every desk anytime soon. The technology is incredibly sensitive and requires extremely low temperatures to operate. The current focus is on building fault-tolerant systems and scaling up the number of qubits."</p>
          <p>When asked about the future, she was optimistic. "I believe that within the next decade, we will see quantum computers solve problems that are currently intractable. It's a journey, not a sprint, and every day we are getting closer to a future where quantum technology can unlock new scientific frontiers."</p>
        `,
        imageUrl: pexelsImageUrls[5],
        category: "Technology",
        type: "latest", // Updated type
        tags: ["Quantum", "Technology", "Science"],
        author: {
          name: "Mark Evans",
          profilePictureUrl: "https://randomuser.me/api/portraits/men/9.jpg",
        },
        authorId: authorIds['Mark Evans'], // Updated authorId
        readTime: 8, // Updated to a number
        views: 3141,
        publishDate: new Date().toISOString(),
      },
      {
        title: "The Impact of 5G on Smart Cities",
        excerpt: "Examining how the rollout of 5G technology is shaping the development of urban areas.",
        content: `
          <p>The fifth generation of mobile technology, 5G, is more than just a faster version of 4G. Its low latency and massive connectivity are foundational to the development of smart cities. By enabling billions of devices to communicate in real-time, 5G can transform how urban infrastructure operates.</p>
          <p>In smart cities, 5G will power everything from traffic management systems to waste collection. Connected sensors can monitor traffic flow and adjust signals to reduce congestion. Similarly, trash cans equipped with sensors can signal when they are full, optimizing collection routes and reducing fuel consumption.</p>
          <p>Public safety is another area where 5G will have a significant impact. Drones can be deployed to monitor large crowds or respond to emergencies, streaming high-definition video in real-time to first responders. This enhanced situational awareness can save lives and improve overall urban security.</p>
          <p>However, the transition to 5G is not without its hurdles. The infrastructure required is extensive, and there are concerns about the cost and equitable distribution of this technology. Ensuring that all communities have access to 5G is a key challenge that cities must address to avoid creating a new digital divide.</p>
          <p>Looking ahead, 5G is poised to be the nervous system of the smart city. Its capabilities will enable a more efficient, sustainable, and safer urban environment, laying the groundwork for a truly connected future.</p>
        `,
        imageUrl: pexelsImageUrls[6],
        category: "Technology",
        type: "latest", // Updated type
        tags: ["5G", "Smart City", "Urban Planning"],
        author: {
          name: "Alex Johnson",
          profilePictureUrl: "https://randomuser.me/api/portraits/men/4.jpg",
        },
        authorId: authorIds['Alex Johnson'], // Updated authorId
        readTime: 4, // Updated to a number
        views: 1890,
        publishDate: new Date().toISOString(),
      },
      {
        title: "The Latest in Sustainable Fashion",
        excerpt: "Exploring new trends and innovations in the eco-friendly fashion industry.",
        content: `
          <p>The fashion industry has long been criticized for its environmental impact, but a new wave of sustainable practices is changing the game. From using recycled materials to implementing circular production models, designers are finding innovative ways to reduce their carbon footprint.</p>
          <p>One of the most promising trends is the use of materials like Tencel, a fabric made from sustainably harvested wood pulp, and Piñatex, a leather alternative derived from pineapple leaves. These materials offer a guilt-free way to create high-quality, fashionable clothing and accessories. This push for new materials is not just a passing fad but a response to growing consumer demand for ethical products.</p>
          <p>Furthermore, the concept of "circular fashion" is gaining traction. Instead of the traditional linear model of "take, make, dispose," circular fashion encourages clothes to be designed for longevity, repair, and recycling. Companies are now offering repair services and buy-back programs to extend the life cycle of their products, reducing textile waste and promoting a more sustainable approach to consumption.</p>
          <p>The rise of the "resale market" is also a significant factor. Platforms for selling and buying pre-owned clothing are now mainstream, offering consumers an alternative to fast fashion. This shift not only promotes sustainability but also makes high-end fashion more accessible to a wider audience.</p>
          <p>While challenges remain—such as scaling up production of new materials and educating consumers—the movement towards sustainable fashion is gaining irreversible momentum. It’s a testament to how consumer choices and technological innovation can drive positive change in a major industry.</p>
        `,
        imageUrl: pexelsImageUrls[7],
        category: "Sustainability",
        type: "latest", // Updated type
        tags: ["Fashion", "Sustainability"],
        author: {
          name: "Samantha Lee",
          profilePictureUrl: "https://randomuser.me/api/portraits/women/7.jpg",
        },
        authorId: authorIds['Samantha Lee'], // Updated authorId
        readTime: 5, // Updated to a number
        views: 765,
        publishDate: new Date().toISOString(),
      },
      {
        title: "The Economics of Digital Nomads",
        excerpt: "An analysis of the economic impact of the remote workforce on local and global economies.",
        content: `
          <p>The rise of the digital nomad—a professional who works remotely while traveling the world—is more than a lifestyle trend; it's a significant economic force. These workers bring their high-tech salaries to local economies, often in developing countries, boosting local businesses from cafes to coworking spaces.</p>
          <p>From the perspective of host countries, digital nomads represent a new form of tourism that provides a stable, year-round revenue stream. Governments are increasingly recognizing this potential, with many countries introducing special visas to attract this talent pool. This move helps to diversify their economies and attract foreign capital.</p>
          <p>However, the influx of digital nomads also brings challenges. In some popular destinations, they are contributing to rising living costs and gentrification, making it difficult for local residents to afford housing. This tension highlights the need for governments and communities to find a balance between attracting foreign talent and protecting the interests of their citizens.</p>
          <p>Furthermore, the digital nomad economy is creating a new ecosystem of services tailored to their needs, from specialized apps for finding temporary housing to international banking solutions. This new market is a testament to the adaptability of the modern economy and the power of a flexible workforce.</p>
          <p>The digital nomad movement is a testament to the evolving nature of work and its global impact. It's a complex phenomenon with both positive and negative consequences that will continue to shape how we think about work, travel, and community in the years to come.</p>
        `,
        imageUrl: pexelsImageUrls[0],
        category: "Workplace",
        type: "latest", // Updated type
        tags: ["Workplace", "Travel", "Economy"],
        author: {
          name: "Jane Doe",
          profilePictureUrl: "https://randomuser.me/api/portraits/women/5.jpg",
        },
        authorId: authorIds['Jane Doe'], // Updated authorId
        readTime: 6, // Updated to a number
        views: 1123,
        publishDate: new Date().toISOString(),
      },
      {
        title: "Decoding the Latest SEO Algorithm Update",
        excerpt: "A breakdown of what the newest search engine algorithm changes mean for content creators and marketers.",
        content: `
          <p>Search engine optimization is a constantly evolving field, and the latest algorithm update has sent ripples through the digital marketing world. While Google rarely reveals the full details of its changes, expert analysis suggests a strong focus on user experience and content quality.</p>
          <p>The update seems to prioritize E-A-T: Expertise, Authoritativeness, and Trustworthiness. This means that a website's overall reputation and the credibility of its authors are now more important than ever. Content written by verifiable experts in their field is likely to be rewarded with higher rankings, pushing low-quality, AI-generated content down in the search results.</p>
          <p>Another significant factor is the emphasis on "helpful content." The algorithm is getting smarter at identifying content that genuinely solves a user's problem or answers their question comprehensively. This shifts the focus from keyword stuffing to creating genuinely valuable and well-researched articles. Sites that provide a poor user experience, with excessive pop-ups and distracting ads, are also being penalized.</p>
          <p>For marketers and content creators, the key takeaway is to move away from purely technical SEO and focus on producing high-quality, authoritative content. Building a strong brand reputation and establishing yourself as a thought leader in your niche is now more important than ever. This update signals a new era of search where quality reigns supreme over quantity.</p>
        `,
        imageUrl: pexelsImageUrls[1],
        category: "Marketing",
        type: "latest", // Updated type
        tags: ["SEO", "Marketing", "Content"],
        author: {
          name: "Mark Evans",
          profilePictureUrl: "https://randomuser.me/api/portraits/men/9.jpg",
        },
        authorId: authorIds['Mark Evans'], // Updated authorId
        readTime: 5, // Updated to a number
        views: 9876,
        publishDate: new Date().toISOString(),
      },
      {
        title: "The Science of a Good Night's Sleep",
        excerpt: "Understanding the biological processes behind sleep and how to improve your rest.",
        content: `
          <p>Sleep is a fundamental human need, yet for many, it remains an elusive luxury. Beyond just feeling tired, a lack of sleep can have serious consequences for both physical and mental health. Understanding the science behind sleep is the first step to improving it.</p>
          <p>Sleep occurs in cycles, each lasting about 90 minutes, and consisting of different stages: NREM (non-rapid eye movement) and REM (rapid eye movement). NREM sleep is when your body repairs tissues, grows muscle, and synthesizes hormones. REM sleep is when you dream, and it is crucial for cognitive functions like memory consolidation and emotional processing.</p>
          <p>To improve your sleep, start with your circadian rhythm, your body's internal clock. Maintain a consistent sleep schedule, even on weekends, to regulate your rhythm. Exposure to natural light in the morning can also help to reset your clock and signal to your body that it's time to wake up. Conversely, reducing your exposure to blue light from screens in the evening can help your body produce melatonin, the hormone that makes you feel sleepy.</p>
          <p>Your bedroom environment also plays a crucial role. A cool, dark, and quiet room is ideal for a good night's rest. Consider investing in blackout curtains, earplugs, or a white noise machine if your surroundings are not conducive to sleep. Avoiding caffeine and alcohol before bed can also help, as these substances can disrupt your sleep cycles.</p>
          <p>By understanding and respecting the science of sleep, you can take control of your rest and unlock its immense benefits for your health and well-being. It's one of the most powerful and accessible tools you have for improving your quality of life.</p>
        `,
        imageUrl: pexelsImageUrls[2],
        category: "Health",
        type: "latest", // Updated type
        tags: ["Health", "Wellness", "Sleep"],
        author: {
          name: "Evelyn Chen",
          profilePictureUrl: "https://randomuser.me/api/portraits/women/10.jpg",
        },
        authorId: authorIds['Evelyn Chen'], // Updated authorId
        readTime: 6, // Updated to a number
        views: 4567,
        publishDate: new Date().toISOString(),
      },
      {
        title: "The Latest in Smart Home Technology",
        excerpt: "A guide to the newest gadgets and platforms for building a smarter, more efficient home.",
        content: `
          <p>Smart home technology is no longer a futuristic concept but a present-day reality for millions. From intelligent thermostats that learn your habits to security cameras that can distinguish between a pet and an intruder, the options for a connected home are more advanced than ever before. The latest trend is seamless integration, where all your devices work together on a single platform to create a truly automated living experience.</p>
          <p>Smart lighting systems are a popular starting point. With a few taps on an app or a voice command, you can change the color, brightness, and even schedule your lights to turn on and off. This not only adds convenience but can also save energy. Many systems are now compatible with major smart home platforms, allowing you to control everything from one central hub.</p>
          <p>Another area of rapid innovation is home security. Smart locks, doorbell cameras, and motion sensors provide a comprehensive security solution that you can monitor from anywhere in the world. These devices can send you real-time alerts, stream live video, and even allow you to talk to visitors remotely. The peace of mind they offer is a major selling point for many homeowners.</p>
          <p>Looking ahead, the next frontier in smart home technology is AI-powered automation. Instead of just following your commands, your home will learn your routines and anticipate your needs. For example, your thermostat might automatically adjust the temperature based on the weather forecast, or your lights might turn on when you're about to arrive home. This level of predictive automation is set to transform how we interact with our living spaces.</p>
        `,
        imageUrl: pexelsImageUrls[3],
        category: "Technology",
        type: "latest", // Updated type
        tags: ["Smart Home", "Gadgets", "Technology"],
        author: {
          name: "Alex Johnson",
          profilePictureUrl: "https://randomuser.me/api/portraits/men/4.jpg",
        },
        authorId: authorIds['Alex Johnson'], // Updated authorId
        readTime: 5, // Updated to a number
        views: 2345,
        publishDate: new Date().toISOString(),
      },
      {
        title: "The Evolving World of Cybersecurity Threats",
        excerpt: "An overview of the new and emerging threats in the digital landscape and how to protect yourself.",
        content: `
          <p>As our lives become more digital, the threats to our online security become more sophisticated. From phishing scams to ransomware attacks, cybercriminals are constantly finding new ways to exploit vulnerabilities. Staying informed and proactive is the only way to protect your personal and financial information.</p>
          <p>One of the most concerning trends is the rise of "deepfake" technology, which can be used to create convincing fake videos and audio recordings. Cybercriminals are using this technology to create scams that are nearly impossible to distinguish from a real person. This highlights the need to be more vigilant than ever and to verify the authenticity of any request for sensitive information.</p>
          <p>Another emerging threat is the proliferation of "Internet of Things" (IoT) devices with weak security. Your smart thermostat, doorbell, or even a toy can be a gateway for hackers to access your home network. It is crucial to change the default passwords on all your IoT devices and to keep their software updated to patch any security vulnerabilities.</p>
          <p>To protect yourself, start with the basics: use strong, unique passwords for all your accounts, and enable two-factor authentication whenever possible. Be cautious of any unsolicited emails or messages, and never click on suspicious links. Keeping your software and operating systems updated is also essential, as these updates often contain critical security patches.</p>
        `,
        imageUrl: pexelsImageUrls[4],
        category: "Technology",
        type: "latest", // Updated type
        tags: ["Cybersecurity", "IoT", "Privacy"],
        author: {
          name: "Mark Evans",
          profilePictureUrl: "https://randomuser.me/api/portraits/men/9.jpg",
        },
        authorId: authorIds['Mark Evans'], // Updated authorId
        readTime: 4, // Updated to a number
        views: 1567,
        publishDate: new Date().toISOString(),
      },
      {
        title: "The Future of Food: Plant-Based Alternatives",
        excerpt: "Examining how plant-based alternatives are reshaping the food industry and our diets.",
        content: `
          <p>The global demand for plant-based food is soaring, driven by a mix of health concerns, environmental awareness, and a growing number of people adopting vegetarian and vegan lifestyles. The innovations in this sector go far beyond a simple veggie burger, with scientists and chefs creating plant-based versions of everything from chicken to seafood that mimic the taste, texture, and nutritional profile of their animal-based counterparts.</p>
          <p>One of the most exciting developments is in cellular agriculture, also known as cultivated meat. This process involves growing animal cells in a lab to produce real meat without the need to raise and slaughter animals. While the technology is still in its early stages and faces regulatory hurdles, it holds the promise of a more sustainable and ethical way to produce meat.</p>
          <p>From a culinary perspective, plant-based foods are becoming more sophisticated and delicious. Chefs are experimenting with new ingredients and techniques to create dishes that are not only healthy but also satisfying. This shift is making it easier for people to reduce their meat consumption without feeling like they are sacrificing flavor or variety.</p>
          <p>The economic impact is also significant, with major food companies and investors pouring billions of dollars into the plant-based sector. This infusion of capital is accelerating research and development, lowering production costs, and making these alternatives more accessible to the average consumer. As these products become more affordable and widely available, they are poised to disrupt the traditional food industry on a global scale.</p>
        `,
        imageUrl: pexelsImageUrls[5],
        category: "Agriculture & Agribusiness",
        type: "latest", // Updated type
        tags: ["Food", "Sustainability", "Vegan"],
        author: {
          name: "Evelyn Chen",
          profilePictureUrl: "https://randomuser.me/api/portraits/women/10.jpg",
        },
        authorId: authorIds['Evelyn Chen'], // Updated authorId
        readTime: 5, // Updated to a number
        views: 999,
        publishDate: new Date().toISOString(),
      },
      {
        title: "The Latest in Genetic Engineering",
        excerpt: "An overview of the new and emerging applications of genetic engineering.",
        content: `
          <p>Genetic engineering is a field that is constantly evolving, with new discoveries and applications being made every day. From gene therapies that can cure diseases to crops that are more resistant to pests and droughts, the potential of this technology is immense. The latest trend is in the development of more precise and targeted gene-editing tools that can make changes to a person's DNA with unprecedented accuracy.</p>
          <p>One of the most promising applications is in the field of medicine. Scientists are using genetic engineering to develop new treatments for a wide range of diseases, including cancer, cystic fibrosis, and sickle cell anemia. These therapies work by correcting the underlying genetic mutations that cause the disease, offering a potential cure rather than just a way to manage symptoms.</p>
          <p>In agriculture, genetic engineering is helping to create crops that are more resilient and nutritious. Scientists are engineering plants to be more resistant to pests and droughts, which can help to improve crop yields and reduce the need for pesticides. They are also working to create crops that are more nutritious, such as a type of rice that is engineered to produce beta-carotene, a precursor to vitamin A.</p>
          <p>However, the ethical implications of genetic engineering are a major concern. There are questions about the safety of these technologies, as well as the potential for misuse. The development of new gene-editing tools has sparked a debate about the "designer baby" concept, where parents could select traits for their children. This highlights the need for a thoughtful and transparent public conversation about the future of this technology.</p>
        `,
        imageUrl: pexelsImageUrls[6],
        category: "Healthcare & Pharmaceuticals",
        type: "latest", // Updated type
        tags: ["Genetics", "Science", "Medicine"],
        author: {
          name: "Kenji Tanaka",
          profilePictureUrl: "https://randomuser.me/api/portraits/men/8.jpg",
        },
        authorId: authorIds['Kenji Tanaka'], // Updated authorId
        readTime: 6, // Updated to a number
        views: 1234,
        publishDate: new Date().toISOString(),
      },
    ];

    // Remove existing posts to avoid duplicates on refresh
    await Post.deleteMany({});

    // Create the new posts and get the results
    const createdPosts = await Post.insertMany(postsToCreate.map(post => ({
      ...post,
      slug: slugify(post.title),
    })));

    console.log(`Successfully created ${createdPosts.length} test posts.`);
    res.status(200).json({ success: true, message: `Successfully created ${createdPosts.length} test posts.` });
  } catch (error) {
    console.error('Failed to create test posts:', error);
    res.status(500).json({ error: 'Failed to create test posts', details: error.message });
  }
}
