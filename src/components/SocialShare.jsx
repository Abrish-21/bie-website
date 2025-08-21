import { Facebook, Twitter, Mail } from "lucide-react";

const SocialShare = () => {
  return (
    <div className="flex items-center space-x-2">
      <button className="social-button social-facebook">
        <Facebook size={16} />
      </button>
      <button className="social-button social-twitter">
        <Twitter size={16} />
      </button>
      <button className="social-button social-email">
        <Mail size={16} />
      </button>
    </div>
  );
};

export default SocialShare;