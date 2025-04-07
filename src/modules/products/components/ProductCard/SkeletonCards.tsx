export const SkeletonCards = ({ count = 6 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div className="col-auto" key={`skeleton-${idx}`}>
          <div
            className="card shadow-sm border-0 rounded-4 px-3"
            style={{ width: 300, height: 400 }}
          >
            <div className="card-body">
              <div className="placeholder-glow mb-2" style={{ height: 150 }}>
                <span className="placeholder col-12 h-100 rounded"></span>
              </div>
              <span className="placeholder col-6 mb-2 rounded"></span>
              <span className="placeholder col-8 mb-2 rounded"></span>
              <span className="placeholder col-4 mb-4 rounded"></span>
              <span className="placeholder btn btn-dark disabled w-100 rounded-pill"></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
