import React, { useState } from 'react';
import { ArrowRight, X, Info, Copy, ExternalLink, ChevronDown, ChevronUp, Wallet, DollarSign, Award, Shield, Cpu, AlertCircle } from 'lucide-react';

// This is the global header wallet button component
export const HeaderWalletButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // Current User's Login
  const currentUser = "JohnnyMnemonic1";
  // Current Date and Time
  const currentDateTime = "2025-04-17 04:44:22";
  
  const toggleConnection = () => {
    if (!isConnected) {
      // In a real implementation, this would open the wallet selection modal
      setIsConnected(true);
    } else {
      setShowDropdown(!showDropdown);
    }
  };
  
  return (
    <div className="relative">
      <button 
        onClick={toggleConnection}
        className={`flex items-center rounded-lg px-3 py-2 text-sm ${
          isConnected ? 'bg-green-900 text-green-400' : 'bg-gray-800 hover:bg-gray-700 text-white'
        }`}
      >
        {isConnected ? (
          <>
            <div className="mr-2 h-2 w-2 rounded-full bg-green-400"></div>
            <span className="mr-1">7X4h...3Pxf</span>
            <ChevronDown size={14} />
          </>
        ) : (
          <>
            <Wallet size={16} className="mr-2" />
            <span>Connect</span>
          </>
        )}
      </button>
      
      {isConnected && showDropdown && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700">
              Copy Address
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700">
              View on Explorer
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700">
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple staking module as a separate component
const StakingModule = ({ walletConnected, onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stakingTier, setStakingTier] = useState(null);
  const [stakingAmount, setStakingAmount] = useState('');
  const [lockPeriod, setLockPeriod] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1000);
  // Current User's Login
  const currentUser = "JohnnyMnemonic1";
  // Current Date and Time
  const currentDateTime = "2025-04-17 04:44:22";
  
  // Simplified tier data
  const tiers = [
    { id: 'conservative', name: 'Conservative', minApy: 5, maxApy: 10, color: 'green', icon: <Shield size={16} /> },
    { id: 'balanced', name: 'Balanced', minApy: 10, maxApy: 30, color: 'blue', icon: <Award size={16} /> },
    { id: 'aggressive', name: 'Aggressive', minApy: 30, maxApy: 60, color: 'purple', icon: <Cpu size={16} /> }
  ];
  
  // For demo purposes - would be calculated based on inputs
  const estimatedRewards = stakingAmount ? (parseFloat(stakingAmount) * 0.25).toFixed(2) : '0.00';
  
  const handleStake = () => {
    if (!stakingTier || !stakingAmount) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would submit a transaction
      alert(`Staked ${stakingAmount} GOLDY for ${lockPeriod} days in ${stakingTier} tier!`);
      setStakingAmount('');
      setStakingTier(null);
    }, 1500);
  };
  
  return (
    <div className="p-4">
      <button onClick={onClose} className="text-gray-400 hover:text-white flex items-center mb-4">
        <ChevronDown size={16} className="rotate-90 mr-1" />
        Back to buy options
      </button>
      
      {/* User Info */}
      <div className="bg-gray-800 rounded-lg p-3 mb-4">
        <div className="text-xs text-gray-400">Logged in as: {currentUser}</div>
        <div className="text-xs text-gray-400">Last updated: {currentDateTime} UTC</div>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-700 pb-2">
        {['dashboard', 'stake', 'positions'].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeTab === tab 
                ? 'bg-yellow-500 text-black' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'dashboard' ? 'Overview' : 
             tab === 'stake' ? 'Stake' : 'Positions'}
          </button>
        ))}
      </div>
      
      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium mb-3">Protocol Statistics</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-500">$5.6M</div>
                <div className="text-xs text-gray-400">TVL</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">2.45M</div>
                <div className="text-xs text-gray-400">GOLDY Staked</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">5-60%</div>
                <div className="text-xs text-gray-400">APY Range</div>
              </div>
            </div>
          </div>
          
          <div className="text-center py-6 bg-gray-800 rounded-lg">
            <p className="text-gray-400 text-sm mb-3">No active staking positions</p>
            <button 
              className="px-3 py-1 bg-yellow-500 text-black rounded text-sm"
              onClick={() => setActiveTab('stake')}
            >
              Start Staking
            </button>
          </div>
        </div>
      )}
      
      {/* Stake Tab */}
      {activeTab === 'stake' && (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-3">Select Strategy</h3>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {tiers.map(tier => (
                <div 
                  key={tier.id}
                  className={`rounded-lg p-3 cursor-pointer ${
                    stakingTier === tier.id 
                      ? `bg-${tier.color}-900/20 border border-${tier.color}-500` 
                      : 'bg-gray-700 border border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setStakingTier(tier.id)}
                >
                  <div className={`w-8 h-8 rounded-full bg-${tier.color}-900/40 flex items-center justify-center mb-2`}>
                    <span className={`text-${tier.color}-500`}>{tier.icon}</span>
                  </div>
                  <h4 className="text-sm font-medium mb-1">{tier.name}</h4>
                  <div className={`text-${tier.color}-500 font-bold text-sm`}>{tier.minApy}-{tier.maxApy}% APY</div>
                </div>
              ))}
            </div>
            
            {stakingTier && (
              <div>
                <h3 className="font-medium mb-3">Stake Amount</h3>
                <div className="relative mb-4">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={stakingAmount}
                    onChange={(e) => setStakingAmount(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 pr-20"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button className="px-2 py-1 bg-gray-600 text-xs rounded mr-1" onClick={() => setStakingAmount(walletBalance.toString())}>
                      MAX
                    </button>
                    <span className="text-gray-400">GOLDY</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-4">Balance: {walletBalance} GOLDY</p>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-sm font-medium">Lock Period: <span className="text-yellow-500">{lockPeriod} days</span></h3>
                  </div>
                  <input
                    type="range"
                    min={7}
                    max={365}
                    value={lockPeriod}
                    onChange={(e) => setLockPeriod(parseInt(e.target.value))}
                    className="w-full accent-yellow-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>7 days</span>
                    <span>365 days</span>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3 mb-4">
                  <h3 className="text-sm font-medium mb-2">Rewards Estimate</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">For {lockPeriod} days</div>
                      <div className="text-lg font-bold text-green-500">+{estimatedRewards} GOLDY</div>
                    </div>
                  </div>
                </div>
                
                <button
                  className={`w-full py-3 rounded-lg font-bold ${
                    parseFloat(stakingAmount) > 0 && !isLoading
                      ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!parseFloat(stakingAmount) > 0 || isLoading}
                  onClick={handleStake}
                >
                  {isLoading ? 'Processing...' : 'Stake GOLDY'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Positions Tab */}
      {activeTab === 'positions' && (
        <div className="text-center py-8 bg-gray-800 rounded-lg">
          <p className="text-gray-400 mb-3">No active staking positions</p>
          <button
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
            onClick={() => setActiveTab('stake')}
          >
            Create Your First Position
          </button>
        </div>
      )}
    </div>
  );
};

const BuyPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState('connect');
  const [wallet, setWallet] = useState(null);
  const [showTokenInfo, setShowTokenInfo] = useState(false);
  const [hardwareWalletMode, setHardwareWalletMode] = useState(false);
  // Current User's Login
  const currentUser = "JohnnyMnemonic1";
  // Current Date and Time
  const currentDateTime = "2025-04-17 04:44:22";
  
  const handleClose = () => setIsOpen(false);
  
  const connectWallet = (walletName) => {
    setWallet(walletName);
    setCurrentStep('buy');
    // In a real implementation, we would connect to the actual wallet
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
      
      <div className="relative bg-gray-900 text-white rounded-xl w-full max-w-md mx-4 overflow-hidden shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <img src="https://i.imgur.com/hAPjxW1.png" alt="Goldy" className="w-8 h-8" />
            Buy $GOLDY
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        {/* User Information */}
        <div className="px-6 py-2 bg-gray-800 border-b border-gray-700 text-xs text-gray-400">
          <div>User: {currentUser}</div>
          <div>Session time: {currentDateTime} UTC</div>
        </div>
        
        {/* Token Info Accordion */}
        <div className="border-b border-gray-700">
          <button 
            className="w-full px-6 py-3 flex items-center justify-between text-gray-300 hover:text-white"
            onClick={() => setShowTokenInfo(!showTokenInfo)}
          >
            <div className="flex items-center gap-2">
              <Info size={16} />
              <span>Token Information</span>
            </div>
            {showTokenInfo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {showTokenInfo && (
            <div className="px-6 py-3 bg-gray-800 text-sm">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <span className="text-gray-400">Network:</span>
                <span>Solana</span>
                <span className="text-gray-400">Total Supply:</span>
                <span>1,000,000,000 GOLDY</span>
              </div>
              <div className="flex items-center mt-3 bg-gray-700 rounded p-2">
                <code className="text-xs flex-1 overflow-hidden text-ellipsis">GOLD9y5hS7ggiNzoZZWenR1nmoLTTgDeB2CK97YxNjH6</code>
                <button className="ml-2 text-gray-400 hover:text-white p-1">
                  <Copy size={14} />
                </button>
              </div>
              <a 
                href="https://solscan.io/token/GOLD9y5hS7ggiNzoZZWenR1nmoLTTgDeB2CK97YxNjH6" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 mt-3 text-xs"
              >
                <ExternalLink size={12} />
                View on Solscan
              </a>
            </div>
          )}
        </div>
        
        {/* Main Content Area */}
        <div className="max-h-[70vh] overflow-y-auto">
          {currentStep === 'connect' && (
            <div className="p-6">
              <h3 className="font-medium mb-4">Connect your wallet to continue</h3>
              
              <div className="flex justify-between mb-4">
                <button 
                  onClick={() => setHardwareWalletMode(false)}
                  className={`flex-1 py-2 rounded-lg ${!hardwareWalletMode ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  Software
                </button>
                <button 
                  onClick={() => setHardwareWalletMode(true)}
                  className={`flex-1 py-2 rounded-lg ${hardwareWalletMode ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  Hardware
                </button>
              </div>
              
              {!hardwareWalletMode ? (
                <div className="space-y-3">
                  <button 
                    onClick={() => connectWallet('phantom')} 
                    className="w-full bg-gray-800 hover:bg-gray-700 py-3 px-4 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img src="https://i.imgur.com/D2IgwWd.png" alt="Phantom" className="w-8 h-8 mr-3" />
                      <span>Phantom</span>
                    </div>
                    <Wallet size={16} />
                  </button>
                  
                  <button 
                    onClick={() => connectWallet('solflare')} 
                    className="w-full bg-gray-800 hover:bg-gray-700 py-3 px-4 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img src="https://i.imgur.com/eUK9cvW.png" alt="Solflare" className="w-8 h-8 mr-3" />
                      <span>Solflare</span>
                    </div>
                    <Wallet size={16} />
                  </button>
                  
                  <button 
                    onClick={() => connectWallet('backpack')} 
                    className="w-full bg-gray-800 hover:bg-gray-700 py-3 px-4 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img src="https://i.imgur.com/zNlY0IQ.png" alt="Backpack" className="w-8 h-8 mr-3" />
                      <span>Backpack</span>
                    </div>
                    <Wallet size={16} />
                  </button>
                  
                  <div className="mt-6 text-gray-400 text-sm">
                    Don't have a wallet yet?{' '}
                    <a href="https://phantom.app/download" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                      Get one here
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <button 
                    onClick={() => connectWallet('ledger')} 
                    className="w-full bg-gray-800 hover:bg-gray-700 py-3 px-4 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <Shield size={16} />
                      </div>
                      <div>
                        <span>Ledger</span>
                        <div className="text-xs text-gray-400">Hardware wallet</div>
                      </div>
                    </div>
                    <Cpu size={16} />
                  </button>
                  
                  <button 
                    onClick={() => connectWallet('trezor')} 
                    className="w-full bg-gray-800 hover:bg-gray-700 py-3 px-4 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                        <Shield size={16} />
                      </div>
                      <div>
                        <span>Trezor</span>
                        <div className="text-xs text-gray-400">Hardware wallet</div>
                      </div>
                    </div>
                    <Cpu size={16} />
                  </button>
                  
                  <div className="bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg p-4 mt-4 flex items-start">
                    <AlertCircle size={16} className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                    <div className="text-xs text-blue-300">
                      <strong>Security tip:</strong> Hardware wallets provide the highest level of security by keeping your private keys offline.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {currentStep === 'buy' && (
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-800 text-green-400 rounded-full p-1 mr-2">
                  <Wallet size={16} />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400">Connected with {wallet}</div>
                  <div className="font-medium truncate">7X4hkrTPGMvB...</div>
                </div>
                <button 
                  onClick={() => setCurrentStep('connect')} 
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Change
                </button>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Choose how to buy</h3>
                
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-500 py-3 px-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign size={16} className="mr-2" />
                      <div>
                        <div className="font-medium text-left">Buy with card</div>
                        <div className="text-xs text-blue-300">Visa, Mastercard, Apple Pay</div>
                      </div>
                    </div>
                    <ArrowRight size={16} />
                  </button>
                  
                  <a 
                    href="https://jup.ag/swap/SOL-GOLD9y5hS7ggiNzoZZWenR1nmoLTTgDeB2CK97YxNjH6" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gray-700 hover:bg-gray-600 py-3 px-4 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img src="https://i.imgur.com/ebKfiAL.jpg" alt="Jupiter" className="w-6 h-6 mr-2 rounded-full" />
                      <div>
                        <div className="font-medium text-left">Swap on Jupiter</div>
                        <div className="text-xs text-gray-400">Best rates via aggregator</div>
                      </div>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              
              {/* Staking Preview */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Staking available</h3>
                  <button 
                    onClick={() => setCurrentStep('stake')} 
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                  >
                    View details <ArrowRight size={12} className="ml-1" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-green-900/20 border border-green-800 rounded-lg p-2 text-center">
                    <div className="text-green-500 font-bold text-sm">5-10%</div>
                    <div className="text-xs text-gray-400">Conservative</div>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-2 text-center">
                    <div className="text-blue-500 font-bold text-sm">10-30%</div>
                    <div className="text-xs text-gray-400">Balanced</div>
                  </div>
                  
                  <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-2 text-center">
                    <div className="text-purple-500 font-bold text-sm">30-60%</div>
                    <div className="text-xs text-gray-400">Aggressive</div>
                  </div>
                </div>
                
                <div className="flex items-center text-xs text-gray-400">
                  <Award size={14} className="mr-1 text-yellow-500" />
                  Stake $GOLDY and earn up to 60% APY
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'stake' && (
            <StakingModule 
              walletConnected={true} 
              onClose={() => setCurrentStep('buy')} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Example usage in a page layout
const WebsiteHeader = () => {
  // Current User's Login
  const currentUser = "JohnnyMnemonic1";
  // Current Date and Time
  const currentDateTime = "2025-04-17 04:44:22";

  return (
    <header className="bg-gray-900 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="https://i.imgur.com/hAPjxW1.png" alt="Goldy" className="w-10 h-10 mr-2" />
        <h1 className="text-xl font-bold text-white">$GOLDY</h1>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-gray-300 hover:text-white">Home</a>
        <a href="#" className="text-gray-300 hover:text-white">About</a>
        <a href="#" className="text-gray-300 hover:text-white">Roadmap</a>
        <span className="text-xs text-gray-400 mr-3">
          {currentUser} | {currentDateTime}
        </span>
        <HeaderWalletButton />
      </div>
    </header>
  );
};

// Include the WebsiteHeader component to show context
const MainPage = () => {
  const [showBuyPanel, setShowBuyPanel] = useState(false);
  // Current User's Login
  const currentUser = "JohnnyMnemonic1";
  // Current Date and Time
  const currentDateTime = "2025-04-17 04:44:22";
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <WebsiteHeader />
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Goldy The Goose</h1>
        <p className="mb-8 max-w-2xl mx-auto">The next generation Solana token with advanced staking capabilities and community governance.</p>
        
        {/* User Info Display */}
        <div className="mb-8 text-sm text-gray-400">
          <p>Current user: {currentUser}</p>
          <p>Current time: {currentDateTime} UTC</p>
        </div>
        
        <button 
          onClick={() => setShowBuyPanel(true)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg"
        >
          Buy $GOLDY Now
        </button>
        
        {showBuyPanel && <BuyPanel />}
      </div>
    </div>
  );
};

export default MainPage;