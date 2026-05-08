import {
  RiShieldCheckLine,
  RiFlashlightLine,
  RiUserLine,
  RiLockLine,
  RiSmartphoneLine,
  RiVideoLine,
} from 'react-icons/ri'

const benefits = [
  {
    icon: RiShieldCheckLine,
    title: '100% Free',
    description: 'No hidden costs, no premium plans. Remove metadata from unlimited files completely free.',
  },
  {
    icon: RiFlashlightLine,
    title: 'Fast Processing',
    description: 'Browser-based processing means instant results. No waiting for server uploads or downloads.',
  },
  {
    icon: RiUserLine,
    title: 'No Signup',
    description: 'Start using immediately. No account, no email, no personal information required.',
  },
  {
    icon: RiLockLine,
    title: 'Privacy Focused',
    description: 'Files never leave your device. All processing happens locally in your browser.',
  },
  {
    icon: RiSmartphoneLine,
    title: 'Works on Mobile',
    description: 'Fully responsive design works perfectly on phones, tablets and desktop computers.',
  },
  {
    icon: RiVideoLine,
    title: 'Supports Videos',
    description: 'Not just images — remove metadata from MP4, MOV, MKV, WEBM and more video formats.',
  },
]

export default function Benefits() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Why Choose <span className="gradient-text">MetaClean</span>?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            The most powerful and private metadata removal tool available online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="card group">
              <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4 group-hover:bg-violet-100 transition-colors">
                <benefit.icon className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
