import "./App.css";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import { sepolia } from "wagmi/chains";
import { abi } from "./abi";

const CONTRACT_ADDRESS = "0xdB53fF65d3eDa8dD7ce94e97C81281555Ce1cFA9";

function App() {
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();

    const { writeContract, isPending, isSuccess } = useWriteContract();

    const requestTokens = () => {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi,
            functionName: "faucet",
            chainId: sepolia.id,
        });
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Arachne Token Faucet 🕷️</h1>

            {!isConnected ? (
                connectors.length > 0 ? (
                    connectors.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => connect({ connector: c })}>
                            Connect with {c.name}
                        </button>
                    ))
                ) : (
                    <p>⚠️ MetaMask not detected. Please use Chrome or Brave.</p>
                )
            ) : (
                <>
                    <p>👤 {address}</p>
                    <button
                        onClick={requestTokens}
                        disabled={isPending || isSuccess}>
                        {isSuccess
                            ? "✅ Done"
                            : isPending
                            ? "⏳ Requesting..."
                            : "🎁 Request Tokens"}
                    </button>
                    <button
                        onClick={() => disconnect()}
                        style={{ marginLeft: 10 }}>
                        🔌 Disconnect
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
