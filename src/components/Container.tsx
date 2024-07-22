const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white container mx-auto max-w-4xl p-8 px-2 custom-box-shadow rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default Container;
