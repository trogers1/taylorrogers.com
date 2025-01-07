import profile from './profile.jpg';
import picard from './picard_square.jpg';
export const ProfileImages: React.FC = () => (
  <div className="relative mb-4">
    <img
      src={profile}
      alt="Taylor Rogers"
      width={200}
      height={200}
      className="rounded-full"
    />
    <div className="absolute bottom-0 right-0 overflow-hidden rounded-full border-4 border-white">
      <a href="https://github.com/trogers1">
        <img
          src={picard}
          alt="Taylor Rogers Picard Avatar"
          width={64}
          height={64}
        />
      </a>
    </div>
  </div>
);
