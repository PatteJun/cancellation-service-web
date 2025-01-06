import CancellationFlow from "@/components/cancellation-flow";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Cancellation Letter Generator
        </h1>
        <CancellationFlow />
      </div>
    </main>
  );
}