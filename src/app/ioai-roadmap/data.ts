// ── IOAI Roadmap Data ──────────────────────────────────────────────
export interface Resource {
  title: string;
  url: string;
  type: "video" | "course" | "book" | "article" | "practice";
  free: boolean;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  resources: Resource[];
}

export interface SkillSection {
  id: string;
  label: string;
  icon: string;
  color: string;
  colorBg: string;
  intro: string;
  minBar?: string;
  topics: Topic[];
}

export interface PhaseWeek {
  label: string;
  tasks: string[];
}

export interface Phase {
  id: string;
  num: number | string;
  color: string;
  duration: string;
  weeks: string;
  title: string;
  objectives: string[];
  weekBreakdown: PhaseWeek[];
  deliverable: string;
}

// ── SKILL SECTIONS ─────────────────────────────────────────────────
export const SKILL_SECTIONS: SkillSection[] = [
  {
    id: "subject-1",
    label: "MATHEMATICS FOR AI",
    icon: "∑",
    color: "#5591c7",
    colorBg: "rgba(85,145,199,0.12)",
    intro: "Master curriculum for MATHEMATICS FOR AI",
    topics: [
      {
        id: "linear-algebra-beginner-vectors-matrices-basic-operations",
        name: `Linear Algebra — BEGINNER — Vectors, Matrices, Basic Operations`,
        description: `- A **vector** is a list of numbers (e.g., \`[2, 5, 1]\`) that can represent anything: a point in space, pixel values, or a feature set. Every data row in ML is a vector.
- A **matrix** is a 2D grid of numbers. When you have 1000 data samples with 10 features each, your data is a 1000×10 matrix.
- **Matrix multiplication**: if matrix A is \`m×k\` and B is \`k×n\`, then \`AB\` is \`m×n\`. The key rule: inner dimensions must match. This is how linear layers in neural networks work — a forward pass is literally \`output = W @ x + b\`.
- **Transpose**: flip rows and columns. \`A.T\` in NumPy. Used constantly in dot products and gradient computations.
- **Dot product**: measures similarity between two vectors. The cosine similarity used in NLP is a normalized dot product.
- **Norms**: \`||v||\` is the length of a vector. L2 norm = Euclidean distance. L1 norm = sum of absolute values. Both appear in regularization (L1/L2 reg in ML).

**Projects:**
- Implement matrix multiplication from scratch (nested Python loops, then NumPy vectorized).
- Compute cosine similarity between two word vectors manually.
- Represent a tiny 3-sample dataset as a matrix and multiply it by a weight vector.`,
        resources: [
          { title: `3Blue1Brown — Essence of Linear Algebra (Chapters 1–5)`, url: "#", type: "article", free: true },
          { title: `3Blue1Brown — Vectors Ch.1`, url: "https://www.youtube.com/watch?v=fNk_zzaMoSs", type: "video", free: true },
          { title: `3Blue1Brown — Linear Transformations Ch.3`, url: "https://www.youtube.com/watch?v=kYB8IZa5AuE", type: "video", free: true },
        ]
      },
      {
        id: "linear-algebra-intermediate-eigenvalues-svd-projections-pca",
        name: `Linear Algebra — INTERMEDIATE — Eigenvalues, SVD, Projections, PCA`,
        description: `- **Eigenvectors/Eigenvalues**: An eigenvector of a matrix A is a special direction that A only stretches (doesn't rotate). \`Av = λv\`. In PCA, eigenvectors of the covariance matrix are the "principal directions" — the axes along which your data varies the most.
- **Principal Component Analysis (PCA)**: Compresses high-dimensional data to fewer dimensions while keeping maximum variance. Steps: (1) center data, (2) compute covariance matrix, (3) eigendecompose it, (4) project data onto top-k eigenvectors.
- **SVD (Singular Value Decomposition)**: Every matrix \`A = UΣV^T\`. U and V are rotation matrices; Σ is a diagonal scaling matrix. Used in recommendation systems, image compression, and understanding linear models.
- **Projections**: Projecting vector \`b\` onto vector \`a\` gives the component of \`b\` in the direction of \`a\`. This is the geometry behind least-squares regression.
- **Rank, null space**: Rank = number of linearly independent rows/columns. The null space contains vectors that A maps to zero — important for understanding underdetermined systems.

**Projects:**
: Projecting vector \`b\` onto vector \`a\` gives the component of \`b\` in the direction of \`a\`. This is the geometry behind least-squares regression.
- **Rank, null space**: Rank = number of linearly independent rows/columns. The null space contains vectors that A maps to zero — important for understanding underdetermined systems.

**Projects at this level:**
- Implement PCA from scratch using NumPy eigendecomposition on MNIST or Iris. Visualize 2D projection.
- Implement low-rank matrix approximation with SVD and show image compression effect.
- Plot eigenvectors of a 2×2 covariance matrix on top of a 2D scatter plot.`,
        resources: [
          { title: `3Blue1Brown — Eigenvectors & Eigenvalues Ch.14`, url: "https://www.youtube.com/watch?v=PFDu9oVAE-g", type: "video", free: true },
          { title: `3Blue1Brown — Dot Products Ch.9`, url: "https://www.youtube.com/watch?v=LyGKycYT2v0", type: "video", free: true },
          { title: `StatQuest — PCA Step-by-Step`, url: "https://www.youtube.com/watch?v=FgakZw6K1QQ", type: "video", free: true },
        ]
      },
      {
        id: "linear-algebra-advanced-matrix-calculus-conditioning-gram-schmidt",
        name: `Linear Algebra — ADVANCED — Matrix Calculus, Conditioning, Gram-Schmidt`,
        description: `- **Matrix calculus**: Compute \`∂L/∂W\` when L is a scalar loss and W is a weight matrix. The result has the same shape as W. This is gradient descent for neural networks.
- **Jacobians and Hessians**: The Jacobian generalizes gradients to vector outputs. The Hessian is the matrix of second derivatives — tells you the curvature of the loss. Saddle points (where Hessian has both positive and negative eigenvalues) are why deep net training is hard.
- **Condition number**: Ratio of largest to smallest singular value of a matrix. High condition number = numerically unstable. Explains why certain problems are hard to optimize and why weight initialization matters.
- **Gram-Schmidt orthogonalization**: Converts any basis into an orthonormal basis. Foundation of QR decomposition. Conceptually important for understanding why batch norm works.

**Projects:**
- Derive gradient of \`L = ||Xw - y||^2\` with respect to \`w\` analytically and verify numerically with finite differences.
- Build a mini autograd that tracks gradient flow through matrix multiply and softmax.`,
        resources: [
          { title: `MIT 18.065 Matrix Methods (Gilbert Strang)`, url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP63oMNUHXqIUcrkS2PivhN3k", type: "video", free: true },
          { title: `Stanford CS229 — Linear Algebra Review (Lecture notes supplement)`, url: "https://cs229.stanford.edu/section/cs229-linalg.pdf", type: "article", free: true },
        ]
      },
      {
        id: "linear-algebra-master-spectral-methods-tensor-algebra-structured-matrices",
        name: `Linear Algebra — MASTER — Spectral Methods, Tensor Algebra, Structured Matrices`,
        description: `- **Spectral graph theory**: Eigenvalues of a graph's Laplacian capture its structure (connectedness, clustering). Basis of Graph Neural Networks (GNNs).
- **Tensor operations**: Generalization of matrices to 3+ dimensions. All deep learning computations are tensor ops (batch × channels × height × width in CNNs). Understanding Einstein summation (\`einsum\`) makes complex attention computations readable.
- **Low-rank approximations in attention**: Modern efficient transformers use low-rank attention approximations (Linformer, Performer). Understanding why requires SVD and spectral analysis.`,
        resources: [
        ]
      },
      {
        id: "probability-and-statistics-beginner-random-variables-distributions-expectation",
        name: `Probability and Statistics — BEGINNER — Random Variables, Distributions, Expectation`,
        description: `- A **random variable** is a variable whose value is determined by a random process. \`X ~ Normal(0, 1)\` means X is drawn from a Gaussian distribution.
- **Probability mass function (PMF)** for discrete variables: \`P(X=k)\`. **Probability density function (PDF)** for continuous: \`f(x)\`, where probabilities come from integrals.
- **Expectation E[X]**: the average value. For a die, E[X] = 3.5. In ML, expected loss = average loss over the data distribution.
- **Variance Var(X)**: how spread out values are. Standard deviation = sqrt(variance). L2 regularization penalizes weight variance.
- **Key distributions to know**: Bernoulli (one binary trial), Binomial (k successes in n trials), Gaussian/Normal (symmetric bell curve, everywhere in statistics), Uniform (equal probability over range), Poisson (counts of rare events).

**Projects:**
- Simulate coin flips and estimate P(heads) with increasing samples. Plot convergence to 0.5 (Law of Large Numbers).
- Plot PMF/PDF of Bernoulli, Binomial, Normal, and Poisson using matplotlib.`,
        resources: [
          { title: `StatQuest — Probability Basics`, url: "https://www.youtube.com/watch?v=uzkc-qNVoOk", type: "video", free: true },
          { title: `StatQuest — Normal Distribution`, url: "https://www.youtube.com/watch?v=rzFX5NWojp0", type: "video", free: true },
          { title: `StatQuest — Probability vs Likelihood`, url: "https://www.youtube.com/watch?v=pYxNSUDSFH4", type: "video", free: true },
        ]
      },
      {
        id: "probability-and-statistics-intermediate-bayes-joint-conditional-distributions-entropy",
        name: `Probability and Statistics — INTERMEDIATE — Bayes, Joint/Conditional Distributions, Entropy`,
        description: `- **Bayes' Theorem**: \`P(A|B) = P(B|A)P(A) / P(B)\`. This is the foundation of Bayesian ML. In classification: \`P(class|data) ∝ P(data|class) * P(class)\`.
- **Joint and conditional distributions**: \`P(X, Y)\` is the joint; \`P(X|Y)\` is conditional. Independent variables: \`P(X, Y) = P(X)P(Y)\`.
- **Maximum Likelihood Estimation (MLE)**: Find parameters θ that maximize \`P(data | θ)\`. Logistic regression training IS maximum likelihood.
- **Entropy**: \`H(X) = -Σ P(x) log P(x)\`. Measures randomness/uncertainty. High entropy = very uncertain. Used in decision trees (information gain = entropy reduction).
- **Cross-entropy**: \`H(p, q) = -Σ p(x) log q(x)\`. The standard classification loss. Minimizing cross-entropy = making your model's distribution \`q\` match the true distribution \`p\`.
- **KL Divergence**: \`KL(p||q) = Σ p log(p/q)\`. Measures how much \`q\` diverges from \`p\`. Used in VAEs, reinforcement learning, knowledge distillation.

**Projects:**
- Build a Naive Bayes text classifier from scratch for spam detection.
- Derive cross-entropy loss from MLE for logistic regression.
- Compute entropy of a decision tree split and find the best split for a toy dataset.`,
        resources: [
          { title: `StatQuest — Bayes Theorem`, url: "https://www.youtube.com/watch?v=9wCnvr7Xw4E", type: "video", free: true },
          { title: `StatQuest — Maximum Likelihood Estimation`, url: "https://www.youtube.com/watch?v=XepXtl9YKwc", type: "video", free: true },
          { title: `3Blue1Brown — Bayes Theorem (visual)`, url: "https://www.youtube.com/watch?v=HZGCoVF3YvM", type: "video", free: true },
        ]
      },
      {
        id: "probability-and-statistics-advanced-concentration-inequalities-generalization-bounds",
        name: `Probability and Statistics — ADVANCED — Concentration Inequalities, Generalization Bounds`,
        description: `- **Law of Large Numbers**: Sample mean converges to true mean as n → ∞. This is why training on more data helps.
- **Central Limit Theorem**: Sum of iid random variables approaches a Gaussian. Explains why many natural phenomena are Gaussian and why Gaussian noise is a good default assumption.
- **Hoeffding's inequality**: Bounds the probability that a sample mean deviates far from its true mean. Provides theoretical justification for train/validation splits.
- **Bias-variance decomposition**: Expected error = Bias² + Variance + Noise. High bias = underfitting. High variance = overfitting. Every regularization technique is a bias-variance trade-off.

**Projects:**
- Empirically demonstrate the bias-variance trade-off by plotting training/validation error vs polynomial degree for regression.
- Plot CLT convergence: show that averages of uniform random variables become Gaussian.`,
        resources: [
          { title: `StatQuest — Bias-Variance Tradeoff`, url: "https://www.youtube.com/watch?v=EuBBz3bI-aA", type: "video", free: true },
          { title: `MIT 6.S191 — Foundations (probability and uncertainty)`, url: "https://www.youtube.com/watch?v=II4giR4vOOo", type: "video", free: true },
        ]
      },
      {
        id: "calculus-and-optimization-beginner-derivatives-chain-rule-partial-derivatives",
        name: `Calculus and Optimization — BEGINNER — Derivatives, Chain Rule, Partial Derivatives`,
        description: `- **Derivative** \`f'(x)\` = slope of f at x. In ML, it tells us how much a loss changes when we change a parameter.
- **Chain rule**: \`d/dx f(g(x)) = f'(g(x)) · g'(x)\`. This is exactly what backpropagation computes — it applies the chain rule through every layer of the network.
- **Partial derivatives**: When f depends on multiple variables (weights), \`∂f/∂w_i\` is how f changes w.r.t. one weight. The gradient \`∇f\` stacks all partial derivatives.
- **Gradient = direction of steepest ascent**. Gradient descent subtracts a fraction of the gradient: \`w ← w - α∇L\`.

**Projects:**
- Compute gradient of \`L = (wx - y)²\` by hand, then verify with NumPy finite differences.
- Implement gradient descent on a 1D loss curve and visualize the path.`,
        resources: [
          { title: `3Blue1Brown — Essence of Calculus (full playlist)`, url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", type: "video", free: true },
          { title: `3Blue1Brown — What is a derivative?`, url: "https://www.youtube.com/watch?v=9vKqVkMQHKk", type: "video", free: true },
          { title: `3Blue1Brown — Chain Rule`, url: "https://www.youtube.com/watch?v=YG15m2VwSjA", type: "video", free: true },
        ]
      },
      {
        id: "calculus-and-optimization-intermediate-backpropagation-gradient-descent-variants",
        name: `Calculus and Optimization — INTERMEDIATE — Backpropagation, Gradient Descent Variants`,
        description: `- **Backpropagation**: Efficient algorithm to compute \`∂L/∂w\` for ALL weights using the chain rule in one backward pass. The key insight: compute gradients from output to input (backwards), reusing intermediate computations.
- **SGD**: Update weights using gradient from one (or a mini-batch of) sample(s). Noisy but fast and generalizes better.
- **Momentum**: Adds a "velocity" term so gradient updates have inertia. Helps escape local minima and speeds up convergence.
- **Adam/AdamW**: Combines momentum with adaptive per-parameter learning rates. Currently the most common optimizer in practice. AdamW adds decoupled weight decay (better than L2 reg with Adam).
- **Learning rate schedules**: Warmup (gradually increase lr at start), cosine annealing (gradually decrease), step decay. Getting these right is crucial for Transformer training.

**Projects:**
- Implement backprop manually for a 2-layer MLP (no PyTorch autograd) on XOR problem.
- Compare SGD, SGD+Momentum, and Adam on a toy regression problem — plot loss curves.
- Implement learning rate warmup + cosine decay and apply it to MLP on MNIST.`,
        resources: [
          { title: `3Blue1Brown — Backpropagation (visual)`, url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U", type: "video", free: true },
          { title: `3Blue1Brown — Backpropagation Calculus`, url: "https://www.youtube.com/watch?v=tIeHLnjs5U8", type: "video", free: true },
          { title: `Andrej Karpathy — micrograd (build backprop from scratch)`, url: "https://www.youtube.com/watch?v=VMj-3S1tku0", type: "video", free: true },
        ]
      },
      {
        id: "calculus-and-optimization-advanced-convex-optimization-second-order-methods-loss-landscapes",
        name: `Calculus and Optimization — ADVANCED — Convex Optimization, Second-Order Methods, Loss Landscapes`,
        description: `- **Convex functions**: A function where the line segment between any two points lies above the curve. Convex optimization = guaranteed global minimum. Linear/logistic regression losses are convex. Neural nets are NOT convex.
- **Hessian and curvature**: Positive definite Hessian → local minimum. Indefinite Hessian → saddle point. Most "local minima" in deep nets are actually saddle points — gradient descent escapes them via noise.
- **Loss landscape visualization**: Deep nets have complex loss surfaces. Flatter minima generalize better (why batch size and learning rate affect generalization, not just speed).`,
        resources: [
          { title: `Stanford CS229 Lecture 2 — Linear Regression, Gradient Descent`, url: "https://www.youtube.com/watch?v=4b4MUYve_U8", type: "video", free: true },
          { title: `MIT 6.S191 — Deep Learning Optimization`, url: "https://www.youtube.com/watch?v=II4giR4vOOo", type: "video", free: true },
        ]
      },
    ]
  },
  {
    id: "subject-2",
    label: "PYTHON & PROGRAMMING TOOLS",
    icon: "⚙️",
    color: "#6daa45",
    colorBg: "rgba(109,170,69,0.12)",
    intro: "Master curriculum for PYTHON & PROGRAMMING TOOLS",
    topics: [
      {
        id: "core-python-beginner-syntax-functions-data-structures",
        name: `Core Python — BEGINNER — Syntax, Functions, Data Structures`,
        description: `- Variables, types (int, float, str, bool, list, dict, tuple, set).
- Control flow: \`if/elif/else\`, \`for\` loops, \`while\`.
- Functions: \`def\`, arguments, return values, default arguments.
- List/dict/set comprehensions: \`[x**2 for x in range(10) if x % 2 == 0]\`.
- File I/O: reading/writing CSV and JSON.
- Error handling: \`try/except/finally\`.

**Projects:**
- Build a CSV reader that loads a dataset and prints basic statistics (mean, min, max).
- Write a function that tokenizes a string into words and counts word frequencies.`,
        resources: [
          { title: `CS50 Introduction to AI with Python — Full Course`, url: "https://www.youtube.com/watch?v=5NgNicANyqM", type: "video", free: true },
          { title: `Sentdex — Practical ML with Python`, url: "https://www.youtube.com/watch?v=OGxgnH8y2NM", type: "video", free: true },
        ]
      },
      {
        id: "core-python-intermediate-oop-generators-numpy-pandas",
        name: `Core Python — INTERMEDIATE — OOP, Generators, NumPy, Pandas`,
        description: `- Classes and OOP: \`__init__\`, \`__repr__\`, inheritance, \`@property\`, \`@staticmethod\`.
- Iterators and generators: \`yield\`, lazy evaluation for large datasets.
- Decorators: \`@functools.lru_cache\`, custom decorators.
- NumPy: array creation, broadcasting, advanced indexing, \`np.einsum\`.
- Pandas: DataFrame creation, indexing (\`.loc\`, \`.iloc\`), \`groupby\`, \`merge\`, \`pivot_table\`, handling missing values, datetime index.

**Projects:**
- Implement K-means clustering using only NumPy (no scikit-learn).
- Use Pandas to clean a messy real-world CSV dataset (missing values, duplicates, type casting, filtering).
- Build a \`Dataset\` class in Python that supports batching and shuffling.`,
        resources: [
          { title: `StatQuest — Statistics Fundamentals Playlist`, url: "https://www.youtube.com/watch?v=qBigTkBLU6g&list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9", type: "video", free: true },
          { title: `Sentdex — NumPy and Pandas tutorials`, url: "https://www.youtube.com/@sentdex", type: "video", free: true },
        ]
      },
      {
        id: "core-python-advanced-pytorch-custom-modules-efficient-pipelines",
        name: `Core Python — ADVANCED — PyTorch Custom Modules, Efficient Pipelines`,
        description: `- Custom \`nn.Module\`: \`__init__\` for layers, \`forward()\` for computation graph.
- Custom \`Dataset\` and \`DataLoader\` with proper collation, augmentation, and multiprocessing.
- Training loop from scratch: optimizer step, gradient zeroing, loss backward, metric tracking, checkpointing.
- Profiling and debugging: finding bottlenecks, checking for NaN gradients, hook-based debugging.

**Projects:**
- Implement a complete training pipeline in PyTorch for CIFAR-10 with: custom Dataset, DataLoader, ResNet-18 fine-tuning, cosine LR schedule, and checkpointing.
- Implement gradient clipping and experiment with its effect on training stability.`,
        resources: [
          { title: `Andrej Karpathy — Neural Networks Zero to Hero (full playlist)`, url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ", type: "video", free: true },
          { title: `Video 1: micrograd (backprop from scratch)`, url: "#", type: "article", free: true },
          { title: `Video 2–5: building language models, MLPs, batch norm, backprop ninja`, url: "#", type: "article", free: true },
          { title: `Video 7: GPT from scratch`, url: "#", type: "article", free: true },
          { title: `Sentdex — PyTorch Deep Learning series`, url: "https://www.youtube.com/watch?v=BzcBsTou0C0", type: "video", free: true },
        ]
      },
    ]
  },
  {
    id: "subject-3",
    label: "CLASSICAL MACHINE LEARNING",
    icon: "ML",
    color: "#a86fdf",
    colorBg: "rgba(168,111,223,0.12)",
    intro: "Master curriculum for CLASSICAL MACHINE LEARNING",
    topics: [
      {
        id: "supervised-learning-beginner-linear-logistic-regression",
        name: `Supervised Learning — BEGINNER — Linear & Logistic Regression`,
        description: `- **Linear regression**: Fit a line \`y = wx + b\` to data by minimizing MSE. The closed-form solution is \`w = (X^T X)^{-1} X^T y\`. Gradient descent converges to the same solution.
- **Logistic regression**: Predicts probabilities using sigmoid function \`σ(z) = 1/(1+e^{-z})\`. Output is between 0 and 1. Loss = binary cross-entropy. NOT actually a regression model — it's a linear classifier.
- **Regularization**: L2 (Ridge) = add \`λ||w||²\` to loss, shrinks weights toward zero. L1 (Lasso) = add \`λ||w||₁\`, creates sparsity (sets some weights exactly to zero). L2 is smooth and differentiable everywhere; L1 is not.
- **Feature scaling**: Always standardize features (zero mean, unit variance) before linear models. Otherwise large-magnitude features dominate.

**Projects:**
- Implement linear regression from scratch with gradient descent. Plot predicted vs actual.
- Implement logistic regression for binary classification. Plot decision boundary on 2D data.`,
        resources: [
          { title: `StatQuest — Linear Regression`, url: "https://www.youtube.com/watch?v=nk2CQITm_eo", type: "video", free: true },
          { title: `StatQuest — Logistic Regression`, url: "https://www.youtube.com/watch?v=yIYKR4sgzI8", type: "video", free: true },
          { title: `Stanford CS229 Lecture 1 — Supervised Learning Intro`, url: "https://www.youtube.com/watch?v=jGwO_UgTS7I", type: "video", free: true },
        ]
      },
      {
        id: "supervised-learning-intermediate-trees-ensembles-svms",
        name: `Supervised Learning — INTERMEDIATE — Trees, Ensembles, SVMs`,
        description: `- **Decision Trees**: Greedily split data on features to minimize entropy (classification) or MSE (regression). Prone to overfitting if deep. Hyperparameters: max_depth, min_samples_leaf.
- **Random Forests**: Ensemble of trees, each trained on a random bootstrap sample with a random feature subset. Reduces variance through averaging. Largely hyperparameter-robust.
- **Gradient Boosting (XGBoost, LightGBM, CatBoost)**: Builds trees sequentially, each one correcting the residuals of the previous. Usually the strongest tabular ML algorithm. Key hyperparameters: n_estimators, learning_rate, max_depth, subsample, colsample_bytree.
- **Support Vector Machines**: Find the maximum-margin hyperplane. With kernel trick, can find non-linear boundaries. RBF kernel is most common. Hyperparameters: C (regularization), γ (RBF width).
- **K-Nearest Neighbors**: Classify by majority vote of k nearest training examples. No training phase — all computation at inference. Sensitive to scale and high dimensions.

**Projects:**
- Train and compare Random Forest vs XGBoost vs LightGBM on a Kaggle tabular dataset. Log all metrics.
- Visualize SVM decision boundary with different kernels (linear, RBF, poly) on 2D synthetic data.
- Visualize a decision tree using \`sklearn.tree.plot_tree\`.`,
        resources: [
          { title: `StatQuest — Decision Trees`, url: "https://www.youtube.com/watch?v=7VeUPuFGJHk", type: "video", free: true },
          { title: `StatQuest — Random Forests`, url: "https://www.youtube.com/watch?v=J4Wdy0Wc_xQ", type: "video", free: true },
          { title: `StatQuest — Gradient Boost`, url: "https://www.youtube.com/watch?v=3CC4N4z3GJc", type: "video", free: true },
          { title: `StatQuest — XGBoost`, url: "https://www.youtube.com/watch?v=OtD8wVaFm6E", type: "video", free: true },
          { title: `Stanford CS229 — SVMs (Lecture 6)`, url: "https://www.youtube.com/watch?v=lDwow4aOrtg", type: "video", free: true },
        ]
      },
      {
        id: "supervised-learning-advanced-feature-engineering-pipelines-calibration",
        name: `Supervised Learning — ADVANCED — Feature Engineering, Pipelines, Calibration`,
        description: `- Feature engineering: polynomial features, interaction terms, log/sqrt transforms, target encoding.
- Handling imbalanced data: SMOTE, class_weight='balanced', threshold tuning, stratified sampling.
- Model calibration: Platt scaling, isotonic regression. Plot reliability curves (calibration curves).
- Scikit-learn \`Pipeline\` + \`ColumnTransformer\` for clean preprocessing-in-pipeline.
- Optuna/hyperparameter tuning: Bayesian optimization for efficient search.

**Projects:**
- Build a complete production-style sklearn pipeline: preprocessing + model + CV + metric reporting.
- Implement target encoding from scratch and compare to one-hot on a categorical dataset.`,
        resources: [
          { title: `StatQuest — Cross Validation`, url: "https://www.youtube.com/watch?v=fSytzGwwBVw", type: "video", free: true },
          { title: `StatQuest — Machine Learning Full Playlist`, url: "https://statquest.org/video_index.html", type: "article", free: true },
        ]
      },
      {
        id: "unsupervised-learning-beginner-k-means-pca",
        name: `Unsupervised Learning — BEGINNER — K-Means, PCA`,
        description: `- **K-Means**: Iteratively assign points to nearest centroid, then update centroids. Initialize with k-means++. Sensitive to outliers. Choose k via elbow method or silhouette score.
- **PCA**: Reduces dimensions by projecting onto top eigenvectors of covariance matrix. Use for visualization, noise removal, and speeding up downstream models.`,
        resources: [
          { title: `StatQuest — K-Means Clustering`, url: "https://www.youtube.com/watch?v=4b5d3muPQmA", type: "video", free: true },
          { title: `StatQuest — PCA Step-by-Step`, url: "https://www.youtube.com/watch?v=FgakZw6K1QQ", type: "video", free: true },
        ]
      },
      {
        id: "unsupervised-learning-intermediate-dbscan-hierarchical-gmms-t-sne-umap",
        name: `Unsupervised Learning — INTERMEDIATE — DBSCAN, Hierarchical, GMMs, t-SNE/UMAP`,
        description: `- **DBSCAN**: Density-based clustering. Can find non-convex clusters and identifies outliers (noise points). No need to specify k. Parameters: \`eps\`, \`min_samples\`.
- **Hierarchical clustering**: Builds a dendrogram by iteratively merging/splitting clusters. Agglomerative (bottom-up) is most common.
- **Gaussian Mixture Models (GMM)**: Probabilistic generalization of K-means. Assigns soft cluster memberships. Trained with EM algorithm.
- **t-SNE and UMAP**: Non-linear dimensionality reduction for visualization. t-SNE preserves local structure; UMAP is faster and also preserves global structure better. NEVER use for quantitative analysis — only visualization.`,
        resources: [
          { title: `StatQuest — DBSCAN`, url: "https://www.youtube.com/watch?v=RDZUdRSDOok", type: "video", free: true },
          { title: `StatQuest — Hierarchical Clustering`, url: "https://www.youtube.com/watch?v=7xHsRkOdVwo", type: "video", free: true },
          { title: `StatQuest — t-SNE`, url: "https://www.youtube.com/watch?v=NEaUSP4YerM", type: "video", free: true },
        ]
      },
    ]
  },
  {
    id: "subject-4",
    label: "DEEP LEARNING",
    icon: "DL",
    color: "#fdab43",
    colorBg: "rgba(253,171,67,0.12)",
    intro: "Master curriculum for DEEP LEARNING",
    topics: [
      {
        id: "neural-networks-from-zero-beginner-perceptrons-activations-forward-pass",
        name: `Neural Networks from Zero — BEGINNER — Perceptrons, Activations, Forward Pass`,
        description: `- **Perceptron**: Takes weighted sum of inputs + bias, passes through a threshold. The simplest classifier. Cannot solve XOR — needs hidden layers.
- **Activation functions**: Non-linearities that let networks learn complex functions. Without them, stacking linear layers = still just one linear layer.
  - **ReLU**: \`max(0, x)\`. Fast, no vanishing gradient for positive inputs. Can "die" if gradients are always negative. Most common.
  - **Sigmoid**: \`1/(1+e^{-x})\`. Squashes to [0,1]. Saturates at extremes → vanishing gradients in deep nets.
  - **Tanh**: \`(e^x - e^{-x})/(e^x + e^{-x})\`. Range [-1, 1]. Better than sigmoid for hidden layers.
  - **GELU, SiLU**: Smooth versions of ReLU used in modern Transformers (GELU in BERT, SiLU in LLaMA).
- **Forward pass**: Data flows from input → hidden layers → output. Each layer: \`h = activation(Wh_{prev} + b)\`.
- **Loss functions**: MSE for regression, Cross-Entropy for classification. Cross-entropy with softmax output = multinomial logistic regression.

**Projects:**
- Implement a 2-layer MLP forward pass using only NumPy. No autograd.
- Train on XOR: show that 1 hidden layer with ReLU can solve it.`,
        resources: [
          { title: `3Blue1Brown — But what is a Neural Network? (Ch.1)`, url: "https://www.youtube.com/watch?v=aircAruvnKk", type: "video", free: true },
          { title: `3Blue1Brown — Gradient Descent, Neural Net Training (Ch.2)`, url: "https://www.youtube.com/watch?v=IHZwWFHWa-w", type: "video", free: true },
          { title: `MIT 6.S191 (2026) — Lecture 1: Deep Learning Foundations`, url: "https://www.youtube.com/watch?v=II4giR4vOOo", type: "video", free: true },
        ]
      },
      {
        id: "neural-networks-from-zero-intermediate-full-training-loop-regularization-batch-norm",
        name: `Neural Networks from Zero — INTERMEDIATE — Full Training Loop, Regularization, Batch Norm`,
        description: `- **Mini-batch training**: Shuffle data, split into batches, compute gradient on each batch, update weights. Epoch = one full pass through data.
- **Dropout**: Randomly zero out activations during training (p=0.1–0.5). Forces network to learn redundant representations. Disable during inference with \`model.eval()\`.
- **Batch Normalization**: Normalizes layer inputs to zero mean, unit variance (per-batch statistics during training; running stats during eval). Dramatically stabilizes and speeds up training. Essential in CNNs.
- **Weight initialization**: Random but careful. Xavier/Glorot (sigmoid/tanh), Kaiming/He (ReLU). Bad init → vanishing or exploding gradients from step 1.
- **Gradient clipping**: Cap gradients at a max norm to prevent explosive updates. Essential for RNNs and recommended for Transformers.
- **Early stopping**: Stop training when validation loss stops improving. Best model = checkpoint at lowest val loss.

**Projects:**
- Train MLP on MNIST to >98% accuracy with dropout and batch norm. Plot learning curves.
- Experiment: remove batch norm and show training instability.
- Visualize weight distributions across layers before and after batch norm with various initializations.`,
        resources: [
          { title: `Andrej Karpathy — Building makemore Part 3 (BatchNorm deep dive)`, url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ", type: "video", free: true },
          { title: `MIT 6.S191 (2025) — Full course playlist`, url: "https://www.youtube.com/watch?v=alfdI7S6wCY", type: "video", free: true },
          { title: `StatQuest — Neural Networks Playlist`, url: "https://statquest.org/video_index.html", type: "article", free: true },
        ]
      },
      {
        id: "neural-networks-from-zero-advanced-custom-architectures-attention-mixed-precision",
        name: `Neural Networks from Zero — ADVANCED — Custom Architectures, Attention, Mixed Precision`,
        description: `- **Residual connections (skip connections)**: \`output = F(x) + x\`. Allows gradients to flow directly through the network — enables training of very deep networks (ResNet).
- **Layer Normalization**: Like batch norm but normalized over the feature dimension (not batch). Used in Transformers because it works with variable-length sequences.
- **Mixed precision training**: Use float16 for most computations (faster, less memory) and float32 for loss scaling. \`torch.cuda.amp.autocast()\`. Crucial for training large models on limited GPU.
- **Gradient accumulation**: Simulate large batch sizes by accumulating gradients over multiple mini-batches before stepping the optimizer. Critical in IOAI's GPU-constrained environment.

**Projects:**
- Implement ResNet-18 from scratch in PyTorch. Train on CIFAR-10, reach >90%.
- Implement scaled dot-product self-attention from scratch.
- Train with and without mixed precision and compare training speed and memory.`,
        resources: [
          { title: `Stanford CS231n (2025) — Lecture 1: CNN intro`, url: "https://www.youtube.com/watch?v=2fq9wYslV0A", type: "video", free: true },
          { title: `Stanford CS231n — Backpropagation and Neural Networks`, url: "https://www.youtube.com/watch?v=25zD5qJHYsk", type: "video", free: true },
          { title: `Andrej Karpathy — Let's build GPT from scratch`, url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", type: "video", free: true },
        ]
      },
      {
        id: "neural-networks-from-zero-master-architecture-search-fine-tuning-large-models-efficiency",
        name: `Neural Networks from Zero — MASTER — Architecture Search, Fine-Tuning Large Models, Efficiency`,
        description: `- **Transfer learning strategies**: When to freeze layers, layer-wise learning rates (lower for early layers, higher for last layers), unfreezing schedules (gradually unfreeze from last layer backwards).
- **Fine-tuning BERT/ViT**: Attach a classification head to a pre-trained transformer, fine-tune with a very small learning rate (\`2e-5\` to \`5e-5\`), warm up for ~10% of steps, cosine decay.
- **Knowledge distillation**: Train a small "student" model to mimic a large "teacher" model. Student trained on soft labels (teacher's softmax outputs), not just hard labels.
- **LoRA (Low-Rank Adaptation)**: Fine-tune only small low-rank matrices added to frozen weight matrices. Drastically reduces trainable parameters. State-of-the-art for fine-tuning LLMs on limited compute.
- **Flash Attention**: IO-aware algorithm for faster attention. Reduces memory from O(N²) to O(N). Know it conceptually; use it in practice.`,
        resources: [
          { title: `fast.ai — Practical Deep Learning for Coders (Lesson 1)`, url: "https://www.youtube.com/watch?v=8SF_h3xF3cE", type: "video", free: true },
          { title: `fast.ai — Full course (9 lessons)`, url: "https://course.fast.ai", type: "video", free: true },
        ]
      },
    ]
  },
  {
    id: "subject-5",
    label: "COMPUTER VISION",
    icon: "👁️",
    color: "#4f98a3",
    colorBg: "rgba(79,152,163,0.12)",
    intro: "Master curriculum for COMPUTER VISION",
    topics: [
      {
        id: "convolutional-neural-networks-beginner-convolutions-filters-pooling",
        name: `Convolutional Neural Networks — BEGINNER — Convolutions, Filters, Pooling`,
        description: `- **Convolution operation**: Slide a small filter (kernel) over the input image, computing dot products. A 3×3 filter detects local patterns (edges, textures). Output size: \`(H - K + 2P) / S + 1\`.
- **Why convolutions work**: Weight sharing (same filter applied everywhere) + local connectivity = far fewer parameters than a fully connected layer on images.
- **Pooling**: Max pooling takes the maximum value in each window → downsamples while keeping the most active features. Global average pooling takes the mean of each feature map → fixed-size output regardless of input size.
- **Common augmentations**: Horizontal flip, random crop, color jitter. These are done on-the-fly during training to prevent overfitting.

**Projects:**
- Implement 2D convolution from scratch (nested loops, then with \`scipy.signal.convolve2d\`).
- Train a simple CNN on MNIST from scratch in PyTorch — 2 conv layers + 2 FC layers. Target: >99%.`,
        resources: [
          { title: `Stanford CS231n (2025) — CNN Architectures`, url: "https://www.youtube.com/watch?v=2fq9wYslV0A", type: "video", free: true },
          { title: `3Blue1Brown — What is a convolution?`, url: "https://www.youtube.com/watch?v=KuXjwB4LzSA", type: "video", free: true },
          { title: `MIT 6.S191 — Convolutional Neural Networks`, url: "https://www.youtube.com/watch?v=II4giR4vOOo", type: "video", free: true },
        ]
      },
      {
        id: "convolutional-neural-networks-intermediate-transfer-learning-resnet-data-augmentation",
        name: `Convolutional Neural Networks — INTERMEDIATE — Transfer Learning, ResNet, Data Augmentation`,
        description: `- **Pre-trained models**: Models trained on ImageNet (1.2M images, 1000 classes). Features learned are generic (edges, textures, shapes) and transfer well to new tasks.
- **ResNet**: Residual connections allow training of 18–152+ layer networks. ResNet-18/34 are fast; ResNet-50+ are more powerful. Standard choice for transfer learning baselines.
- **Fine-tuning strategy**: (1) Replace last FC layer with new head. (2) Freeze all layers, train head for 1–2 epochs. (3) Unfreeze all layers, train with small lr (1e-4 to 1e-5). (4) Use cosine LR decay.
- **Advanced augmentations**: Mixup (blend two images + labels), CutMix (cut and paste patches), Cutout/Random Erasing, Albumentations library.

**Projects:**
- Fine-tune ResNet-18 on a custom 10-class image dataset. Compare frozen vs full fine-tuning.
- Implement Mixup augmentation from scratch and show training accuracy benefit.`,
        resources: [
          { title: `Stanford CS231n — Training Neural Networks`, url: "https://cs231n.stanford.edu/schedule.html", type: "article", free: true },
          { title: `fast.ai Lesson 1 — Image Classification (practical, top-down)`, url: "https://www.youtube.com/watch?v=8SF_h3xF3cE", type: "video", free: true },
        ]
      },
      {
        id: "convolutional-neural-networks-advanced-detection-segmentation-adversarial-examples",
        name: `Convolutional Neural Networks — ADVANCED — Detection, Segmentation, Adversarial Examples`,
        description: `- **Object Detection**: Predicts bounding boxes + class labels. YOLO: single-pass, anchor-based, very fast. DETR: Transformer-based, anchor-free, end-to-end trainable. Know IoU, NMS, mAP.
- **Semantic Segmentation**: Classify every pixel. U-Net: encoder-decoder with skip connections. Used in medical imaging, satellite imagery. FCN: fully convolutional for arbitrary input sizes.
- **Adversarial examples**: Small, imperceptible perturbations to inputs that fool classifiers. FGSM: \`x_adv = x + ε * sign(∇_x L)\`. PGD: iterative version of FGSM. **IOAI 2024 had a task on this!**
- **Adversarial training**: Add adversarial examples to training set. Makes model more robust but costs ~3x more compute.

**Projects:**
- Implement FGSM and PGD attacks on a trained CIFAR-10 ResNet. Measure accuracy drop.
- Train a U-Net on a segmentation dataset (Oxford Pets or similar). Visualize predictions.`,
        resources: [
          { title: `Stanford CS231n Lecture 9 (Object Detection, Segmentation)`, url: "https://cs231n.stanford.edu/schedule.html", type: "article", free: true },
          { title: `MIT 6.S191 — Modern Computer Vision`, url: "https://www.youtube.com/watch?v=II4giR4vOOo", type: "video", free: true },
        ]
      },
      {
        id: "convolutional-neural-networks-master-vision-transformers-clip-diffusion-self-supervised-vision",
        name: `Convolutional Neural Networks — MASTER — Vision Transformers, CLIP, Diffusion, Self-Supervised Vision`,
        description: `- **ViT (Vision Transformer)**: Split image into 16×16 patches, treat as tokens, apply standard Transformer encoder. Needs large datasets but scales beautifully.
- **CLIP**: Joint vision-language model. Trained with contrastive loss on image-text pairs. Creates a shared embedding space — text and image of the same concept land nearby.
- **Diffusion Models**: Forward process adds Gaussian noise gradually; reverse process learns to denoise. UNet backbone with time embedding. Stable Diffusion is based on latent diffusion (operates in compressed latent space for efficiency).
- **Self-supervised vision**: SimCLR, DINO, MAE (Masked Autoencoder). Pretrain without labels by predicting masked patches or maximizing embedding agreement under augmentations.`,
        resources: [
          { title: `Stanford CS231n 2025 — Self-supervised and Generative Models`, url: "https://cs231n.stanford.edu/schedule.html", type: "article", free: true },
          { title: `fast.ai Part 2 — Deep Learning Foundations to Stable Diffusion`, url: "https://course.fast.ai/Lessons/part2.html", type: "video", free: true },
          { title: `Andrej Karpathy — Let's build GPT (attention mechanism applies equally to ViT)`, url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", type: "video", free: true },
        ]
      },
    ]
  },
  {
    id: "subject-6",
    label: "NATURAL LANGUAGE PROCESSING",
    icon: "💬",
    color: "#ff4757",
    colorBg: "rgba(255,71,87,0.12)",
    intro: "Master curriculum for NATURAL LANGUAGE PROCESSING",
    topics: [
      {
        id: "nlp-from-rules-to-transformers-beginner-tokenization-tf-idf-classical-nlp",
        name: `NLP from Rules to Transformers — BEGINNER — Tokenization, TF-IDF, Classical NLP`,
        description: `- **Text preprocessing**: Lowercasing, punctuation removal, stopword removal, stemming (Porter), lemmatization (WordNet). Not always beneficial — context matters.
- **Tokenization**: Split text into tokens (words, subwords, or characters). Word tokenization is simple. Subword tokenization (BPE, WordPiece) handles OOV words and is used in all modern models.
- **Bag-of-Words**: Represent a document as a vector of word counts. Ignores word order. Simple but surprisingly effective for classification.
- **TF-IDF**: Weight words by how often they appear in a document (TF) relative to how common they are across all documents (IDF). Rare words that appear frequently in one doc are most informative.

**Projects:**
- Build a spam classifier with TF-IDF + Logistic Regression on SMS Spam dataset. Reach >97% accuracy.
- Implement bag-of-words vectorizer from scratch (no sklearn).`,
        resources: [
          { title: `Stanford CS224N Lecture 1 — Word Vectors`, url: "https://www.youtube.com/watch?v=DzpHeXVSC5I", type: "video", free: true },
          { title: `StatQuest — Word2Vec / Word Embedding`, url: "https://www.youtube.com/watch?v=viZrOnJclY0", type: "video", free: true },
        ]
      },
      {
        id: "nlp-from-rules-to-transformers-intermediate-word-embeddings-rnns-sequence-models",
        name: `NLP from Rules to Transformers — INTERMEDIATE — Word Embeddings, RNNs, Sequence Models`,
        description: `- **Word2Vec**: Two architectures: CBOW (predict word from context) and Skip-gram (predict context from word). Trained with noise-contrastive estimation. Learns semantic relationships: \`king - man + woman ≈ queen\`.
- **GloVe**: Global Vectors. Captures co-occurrence statistics. Pre-trained on Common Crawl (42B tokens). Often better than Word2Vec for downstream tasks.
- **Bias in embeddings**: Occupational stereotypes, gender/racial analogies. Debiasing via projection (remove gender direction). **IOAI 2024 sample task covered this explicitly.**
- **RNN**: Process sequences step-by-step, maintaining a hidden state. Suffers from vanishing gradients for long sequences.
- **LSTM**: Adds input/forget/output gates that control information flow. Handles longer dependencies. Used in machine translation before Transformers.
- **GRU**: Simplified LSTM with fewer gates. Slightly less powerful but faster.

**Projects:**
- Load pre-trained GloVe embeddings, compute analogies, and visualize with t-SNE.
- Implement a bias debiasing procedure on GloVe: (1) identify gender subspace with PCA, (2) project embeddings to remove it.
- Train a character-level LSTM language model to generate text.`,
        resources: [
          { title: `Stanford CS224N Lecture 2 — Word Vectors and Optimization`, url: "https://www.youtube.com/watch?v=nBor4jfWwetQ", type: "video", free: true },
          { title: `Stanford CS224N Lecture 6 — Vanishing Gradients, LSTMs`, url: "https://www.youtube.com/watch?v=Ba6Fn1-Jsfw", type: "video", free: true },
          { title: `Andrej Karpathy — Building makemore (character language model)`, url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ", type: "video", free: true },
        ]
      },
      {
        id: "nlp-from-rules-to-transformers-advanced-transformers-bert-fine-tuning",
        name: `NLP from Rules to Transformers — ADVANCED — Transformers, BERT, Fine-Tuning`,
        description: `- **Self-attention**: Each token attends to every other token with a learned attention weight. \`Attention(Q,K,V) = softmax(QK^T / √d_k)V\`. Captures long-range dependencies in O(1) layers.
- **Multi-head attention**: Run \`h\` parallel attention heads, concatenate outputs, project. Each head can attend to different aspects (syntax, coreference, etc.).
- **Positional encoding**: Adds order information (tokens are otherwise order-agnostic). Sinusoidal (original Transformer) or learned (BERT, GPT).
- **BERT**: Bidirectional encoder. Pre-trained with masked language modeling (predict 15% masked tokens) and next sentence prediction. Fine-tune by adding a task head.
- **GPT-style models**: Autoregressive decoder. Pre-trained by predicting next token. Fine-tuned with instruction tuning (RLHF, SFT).
- **Tokenizers**: BPE (Byte-Pair Encoding), WordPiece. Handle any word by splitting into subword units. Vocabulary size ~30K–50K.

**Projects:**
- Fine-tune BERT for sentiment classification on SST-2 using Hugging Face Trainer API.
- Implement scaled dot-product attention and multi-head attention from scratch in PyTorch.
- Build GPT-2-scale model following Karpathy's "Let's build GPT" tutorial.`,
        resources: [
          { title: `Andrej Karpathy — Let's build GPT from scratch (3h)`, url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", type: "video", free: true },
          { title: `Stanford CS224N Lecture 3 — Backpropagation & NLP`, url: "https://www.youtube.com/watch?v=HnliVHU2g9U", type: "video", free: true },
          { title: `Hugging Face — Fine-Tuning BERT Tutorial`, url: "https://www.youtube.com/watch?v=GsveHUpNFs8", type: "video", free: true },
          { title: `MIT 6.S191 — Transformers and Attention`, url: "https://www.youtube.com/watch?v=II4giR4vOOo", type: "video", free: true },
        ]
      },
      {
        id: "nlp-from-rules-to-transformers-master-llms-instruction-tuning-rag-efficient-inference",
        name: `NLP from Rules to Transformers — MASTER — LLMs, Instruction Tuning, RAG, Efficient Inference`,
        description: `- **Instruction tuning (SFT)**: Fine-tune pre-trained LLMs on (instruction, response) pairs. Makes them follow user intent.
- **RLHF**: Reinforcement Learning from Human Feedback. Train a reward model, then use PPO to optimize the LLM toward high-reward responses. Used in ChatGPT, Claude, Gemini.
- **RAG (Retrieval-Augmented Generation)**: Retrieve relevant documents from a knowledge base, prepend to context, generate a conditioned response. Reduces hallucination, keeps knowledge fresh.
- **Quantization**: Reduce model weights from float32 to int8 or int4. Drastically reduces memory at small accuracy cost. GGUF, GPTQ, AWQ are common quantization formats (relevant to your Ollama work).
- **LoRA / QLoRA**: Fine-tune quantized LLMs with LoRA adapters. Enables training 7B+ parameter models on consumer GPUs.`,
        resources: [
          { title: `Hugging Face NLP Course`, url: "https://huggingface.co/learn/llm-course/chapter1/1", type: "video", free: true },
          { title: `Hugging Face Transformers Tutorial Playlist`, url: "https://www.youtube.com/playlist?list=PLc2rvfiptPSTGfTp0nhC71ksTY1p5ooCW", type: "video", free: true },
          { title: `fast.ai Part 2 — LLMs and generative models`, url: "https://course.fast.ai/Lessons/part2.html", type: "video", free: true },
        ]
      },
    ]
  },
  {
    id: "subject-7",
    label: "AUDIO / MULTIMODAL AI",
    icon: "🎵",
    color: "#ff9ff3",
    colorBg: "rgba(255,159,243,0.12)",
    intro: "Master curriculum for AUDIO / MULTIMODAL AI",
    topics: [
      {
        id: "audio-understanding-beginner-signal-processing-basics-spectrograms",
        name: `Audio Understanding — BEGINNER — Signal Processing Basics, Spectrograms`,
        description: `- **Digital audio**: Sampled at 16kHz–44.1kHz. Each sample = amplitude value.
- **Fourier Transform**: Decomposes signal into frequency components. FFT = Fast Fourier Transform (efficient algorithm). Short-Time Fourier Transform (STFT) = FFT over sliding windows → gives time-frequency representation.
- **Spectrogram**: 2D image where X=time, Y=frequency, brightness=amplitude. CNNs trained on spectrograms can classify sounds.
- **Mel spectrogram**: Frequency axis warped to Mel scale (matches human hearing perception). MFCC = cepstral coefficients of mel spectrogram = compact audio feature vector.

**Projects:**
- Load an audio file with \`librosa\`, compute STFT, plot spectrogram.
- Compute MFCCs and compare between two different sounds visually.`,
        resources: [
          { title: `MIT 6.S191 — Sequence Modeling and Audio`, url: "https://www.youtube.com/watch?v=II4giR4vOOo", type: "video", free: true },
        ]
      },
      {
        id: "audio-understanding-intermediate-audio-classification-pre-trained-models",
        name: `Audio Understanding — INTERMEDIATE — Audio Classification, Pre-trained Models`,
        description: `- **Audio classification pipeline**: Load audio → resample to 16kHz → compute mel spectrogram → treat as image → feed into CNN or Transformer.
- **Whisper**: OpenAI's speech-to-text model. Encoder-decoder Transformer. Fine-tunable on custom languages (e.g., Mongolian). Used in your STT work.
- **HuBERT/wav2vec2**: Self-supervised audio encoders. Pre-trained on unlabeled audio. Fine-tune on audio classification, emotion recognition, language ID.
- **Qwen-Audio**: Multimodal LLM that understands audio and text. Part of IOAI 2026 syllabus.

**Projects:**
- Fine-tune Whisper-small on a custom language dataset using Hugging Face.
- Build an audio classifier using mel spectrograms + ResNet-18 on UrbanSound8K dataset.`,
        resources: [
          { title: `Hugging Face — Fine-tuning Whisper`, url: "https://huggingface.co/blog/fine-tune-whisper", type: "article", free: true },
          { title: `MIT 6.S191 (2025) — Audio and multimodal AI segments`, url: "https://www.youtube.com/watch?v=alfdI7S6wCY", type: "video", free: true },
        ]
      },
    ]
  },
  {
    id: "subject-8",
    label: "GENERATIVE AI & IOAI PRACTICAL ROUND",
    icon: "✨",
    color: "#d19900",
    colorBg: "rgba(209,153,0,0.12)",
    intro: "Master curriculum for GENERATIVE AI & IOAI PRACTICAL ROUND",
    topics: [
      {
        id: "diffusion-models-and-image-generation-beginner-how-diffusion-works",
        name: `Diffusion Models and Image Generation — BEGINNER — How Diffusion Works`,
        description: `- **Forward process**: Gradually add Gaussian noise to an image over T timesteps until it becomes pure noise. This is fixed (not learned).
- **Reverse process**: Learn to denoise — given a noisy image at timestep t, predict the noise. A UNet with time conditioning does this.
- **DDPM**: Denoising Diffusion Probabilistic Models. Original diffusion paper by Ho et al. 2020.
- **Guidance scale (CFG)**: Classifier-free guidance. Higher scale = more adherence to text prompt but less diversity.

**Projects:**
- Study and run a minimal DDPM implementation on MNIST-scale images.`,
        resources: [
          { title: `MIT 6.S191 (2025/2026) — Generative Models`, url: "https://www.youtube.com/watch?v=alfdI7S6wCY", type: "video", free: true },
          { title: `fast.ai Part 2 — Deep Learning Foundations to Stable Diffusion`, url: "https://course.fast.ai/Lessons/part2.html", type: "video", free: true },
        ]
      },
      {
        id: "diffusion-models-and-image-generation-intermediate-stable-diffusion-prompting-controlnet",
        name: `Diffusion Models and Image Generation — INTERMEDIATE — Stable Diffusion, Prompting, ControlNet`,
        description: `- **Latent Diffusion**: Run diffusion in a compressed latent space (encoded by a VAE), not pixel space. Much faster. Basis of Stable Diffusion.
- **Prompt engineering**: Positive prompts (what you want), negative prompts (what to avoid), style keywords, quality boosters.
- **ControlNet**: Add spatial conditioning (pose, depth, edges) to control image structure.
- **SDXL/FLUX**: Newer, higher-quality variants. Know them conceptually.

**Projects:**
- Build a storytelling visual pipeline: given a set of lyrics or a narrative, generate a consistent visual sequence.`,
        resources: [
          { title: `fast.ai Part 2 — Stable Diffusion from scratch`, url: "https://course.fast.ai/Lessons/part2.html", type: "video", free: true },
        ]
      },
      {
        id: "diffusion-models-and-image-generation-master-multimodal-systems-clip-vision-language-models",
        name: `Diffusion Models and Image Generation — MASTER — Multimodal Systems, CLIP, Vision-Language Models`,
        description: `- **CLIP**: Contrastive Language-Image Pre-Training. Maps images and text to the same embedding space. Can do zero-shot classification.
- **LLaVA / GPT-4V style models**: Visual instruction tuning. Connect a vision encoder (ViT or CLIP) to an LLM via a projection layer.
- **Evaluation of generated content**: FID (Fréchet Inception Distance) for image quality, CLIP score for text-image alignment.`,
        resources: [
          { title: `Stanford CS231n 2025 — Vision and Language Models`, url: "https://cs231n.stanford.edu/schedule.html", type: "article", free: true },
        ]
      },
    ]
  },
  {
    id: "subject-9",
    label: "CONTEST EXECUTION SKILLS",
    icon: "🏆",
    color: "#10ac84",
    colorBg: "rgba(16,172,132,0.12)",
    intro: "Master curriculum for CONTEST EXECUTION SKILLS",
    topics: [
      {
        id: "ioai-specific-strategies-beginner-template-notebook-eda-baseline-in-1h",
        name: `IOAI-Specific Strategies — BEGINNER — Template Notebook, EDA, Baseline in 1h`,
        description: `**What to build:**

Design and practice a **personal contest notebook template** with the following structure:
\`\`\`
1. IMPORTS AND CONFIG
2. DATA LOADING (with shape/dtype checks)
3. EDA (5–10 quick plots: distributions, correlations, class balance, sample images if CV)
4. PREPROCESSING (scaling, encoding, splits)
5. BASELINE MODEL (simplest possible: logistic reg, linear, or random forest)
6. IMPROVEMENTS (iterate from baseline, log every experiment)
7. ENSEMBLE / POST-PROCESSING
8. FINAL PREDICTION + SUBMISSION
\`\`\`

**Practice drill:** Pick any Kaggle dataset, set a timer for 60 min, and hit the baseline structure fully.

---`,
        resources: [
        ]
      },
      {
        id: "ioai-specific-strategies-intermediate-experiment-tracking-ablations-time-management",
        name: `IOAI-Specific Strategies — INTERMEDIATE — Experiment Tracking, Ablations, Time Management`,
        description: `**What to learn:**
- Log every experiment with: model name, hyperparameters, validation score, and short note.
- Plan ablations: change one thing at a time. Never change 3 things simultaneously or you cannot attribute improvement.
- Time boxing: 20% EDA + baseline, 60% model iteration, 20% cleanup and submission.

---`,
        resources: [
        ]
      },
      {
        id: "ioai-specific-strategies-advanced-ioai-task-re-implementation",
        name: `IOAI-Specific Strategies — ADVANCED — IOAI Task Re-implementation`,
        description: `**What to do:**
- Download all **IOAI 2024 Task PDFs and solution notebooks** from \`https://ioai-official.org/2024-tasks/\`
- Read **Team Japan's at-home write-up**: \`https://zenn.dev/chizuchizu/articles/b556a5b6ad6019\`
- Read **community solution hub**: \`https://ioai-writeup.github.io\`
- For each task: try to solve it FIRST without reading the solution. Compare after.
- Note: IOAI tasks span ML (tabular), NLP (text classification, embeddings, language model training), CV (image classification, adversarial), and Practical (image/video generation).

---`,
        resources: [
        ]
      },
      {
        id: "ioai-specific-strategies-master-full-mock-contest-simulation",
        name: `IOAI-Specific Strategies — MASTER — Full Mock Contest Simulation`,
        description: `**Protocol:**
1. Set up Bohrium-like environment (Jupyter, offline except approved docs).
2. Pick 2–3 tasks from IOAI 2024 or national olympiad sources.
3. Work for exactly 8 hours. No cheating with external resources beyond approved docs.
4. After: debrief — what you scored, what top solutions scored, what specific skill the gap was.
5. Repeat every 3 weeks from Phase 4 onwards.`,
        resources: [
          { title: `IOAI 2024 Tasks: \``, url: "https://ioai-official.org/2024-tasks/", type: "article", free: true },
          { title: `Awesome IOAI Tasks Repo: \``, url: "https://github.com/open-cu/awesome-ioai-tasks", type: "article", free: true },
          { title: `Romania OAI Solutions: \``, url: "https://github.com/stefanasandei/roai-solved", type: "article", free: true },
          { title: `IOAI Writeup Hub: \``, url: "https://ioai-writeup.github.io", type: "article", free: true },
        ]
      },
    ]
  },
  {
    id: "subject-10",
    label: "REINFORCEMENT LEARNING",
    icon: "🎮",
    color: "#06b6d4",
    colorBg: "rgba(6,182,212,0.12)",
    intro: "From Markov Decision Processes to PPO — master the agent paradigm",
    topics: [
      {
        id: "rl-beginner-mdps-value-functions-bellman",
        name: `Reinforcement Learning — BEGINNER — MDPs, Value Functions, Bellman Equation`,
        description: `- **Agent-Environment Loop**: At each time step, the agent observes state s, takes action a, receives reward r, transitions to s'. The goal: maximize cumulative discounted reward.
- **Markov Decision Process (MDP)**: Defined by (S, A, P, R, γ). P(s'|s,a) = transition probabilities. R(s,a) = reward. γ = discount factor (0.99 typical).
- **Value Function V(s)**: Expected cumulative reward from state s. V(s) = E[Σ γ^t r_t | s_0 = s].
- **Action-Value Q(s,a)**: Expected return from taking action a in state s, then following the policy.
- **Bellman Equation**: V(s) = max_a [R(s,a) + γ Σ P(s'|s,a) V(s')]. The recursive structure that makes DP solutions possible.
- **Policy vs Value Iteration**: Two classical algorithms for solving MDPs when the model is known. Policy iteration alternates policy evaluation and improvement.

**Projects:**
- Implement Value Iteration for FrozenLake (OpenAI Gym) from scratch.
- Build a simple GridWorld and solve it with Policy Iteration.
- Visualize the value function as a heatmap over states.`,
        resources: [
          { title: `David Silver — RL Course Lecture 1 (Intro to RL)`, url: "https://www.youtube.com/watch?v=2pWv7GOvuf0", type: "video", free: true },
          { title: `David Silver — RL Course Lecture 2 (MDPs)`, url: "https://www.youtube.com/watch?v=lfHX2hHRMVQ", type: "video", free: true },
          { title: `Stanford CS234 — Reinforcement Learning (Full Course)`, url: "https://www.youtube.com/playlist?list=PLoROMvodv4rOSOPzutgyCTapiGlY2Nd8u", type: "video", free: true },
          { title: `OpenAI Spinning Up — RL Introduction`, url: "https://spinningup.openai.com/en/latest/spinningup/rl_intro.html", type: "article", free: true },
        ]
      },
      {
        id: "rl-intermediate-dqn-policy-gradients-a2c",
        name: `Reinforcement Learning — INTERMEDIATE — DQN, Policy Gradients, A2C`,
        description: `- **Deep Q-Network (DQN)**: Approximate Q(s,a) with a neural network. Key innovations: experience replay buffer (break correlations), target network (stability), epsilon-greedy exploration.
- **Policy Gradients (REINFORCE)**: Directly optimize the policy π_θ(a|s). Gradient: ∇J = E[Σ ∇log π(a|s) * G_t]. High variance but works with continuous actions.
- **Actor-Critic**: Combine value-based (critic V(s)) and policy-based (actor π(a|s)). Critic reduces variance of policy gradient. A2C = synchronous advantage actor-critic.
- **Advantage Function**: A(s,a) = Q(s,a) - V(s). Measures how much better action a is compared to average. Using advantages reduces gradient variance dramatically.
- **Exploration strategies**: ε-greedy (DQN), entropy bonus (A2C), curiosity-driven (ICM), count-based exploration. Exploration is the fundamental challenge in RL.

**Projects:**
- Implement DQN from scratch in PyTorch for CartPole. Include replay buffer and target network.
- Implement REINFORCE for CartPole and compare learning curves with DQN.
- Build A2C for Atari Pong using frame stacking and CNN feature extractor.`,
        resources: [
          { title: `David Silver — RL Lecture 6 (Value Function Approximation)`, url: "https://www.youtube.com/watch?v=UoPei5o4fps", type: "video", free: true },
          { title: `DeepMind x UCL — Deep RL Lecture Series`, url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZDVH599EItlEWsUOsJbAodm", type: "video", free: true },
          { title: `Andrej Karpathy — Deep Reinforcement Learning, Pong from Pixels`, url: "https://karpathy.github.io/2016/05/31/rl/", type: "article", free: true },
          { title: `Stable Baselines3 — RL Library Documentation`, url: "https://stable-baselines3.readthedocs.io/", type: "article", free: true },
        ]
      },
      {
        id: "rl-advanced-ppo-sac-multi-agent",
        name: `Reinforcement Learning — ADVANCED — PPO, SAC, Multi-Agent RL`,
        description: `- **PPO (Proximal Policy Optimization)**: The workhorse of modern RL. Clips the policy ratio to prevent destructively large updates. ratio = π_new/π_old, clipped to [1-ε, 1+ε]. Used in ChatGPT's RLHF.
- **SAC (Soft Actor-Critic)**: Maximum entropy RL — agent maximizes reward AND entropy (exploration). Learns stochastic policies. State-of-the-art for continuous control (robotics).
- **Multi-Agent RL (MARL)**: Multiple agents learning simultaneously. Challenges: non-stationarity (other agents change), credit assignment, communication. MAPPO is multi-agent PPO.
- **Reward Shaping**: Designing reward functions is an art. Sparse vs dense rewards. Potential-based reward shaping preserves optimal policies. Reward hacking: agents exploit loopholes.
- **RLHF (RL from Human Feedback)**: Train a reward model from human preferences, then optimize policy with PPO against that reward model. Core technique behind ChatGPT/Claude/Gemini alignment.

**Projects:**
- Train PPO agent on MuJoCo HalfCheetah using CleanRL or Stable Baselines3.
- Implement a simple RLHF pipeline: train reward model on preference data, fine-tune a small LM with PPO.
- Multi-agent experiment: train two PPO agents in competitive Pong.`,
        resources: [
          { title: `OpenAI — PPO Paper Explained (Spinning Up)`, url: "https://spinningup.openai.com/en/latest/algorithms/ppo.html", type: "article", free: true },
          { title: `Hugging Face — Deep RL Course (Full, Free)`, url: "https://huggingface.co/learn/deep-rl-course/unit0/introduction", type: "video", free: true },
          { title: `CleanRL — Single-file RL Implementations`, url: "https://github.com/vwxyzjn/cleanrl", type: "article", free: true },
          { title: `Anthropic — RLHF Explained`, url: "https://www.anthropic.com/research", type: "article", free: true },
        ]
      },
      {
        id: "rl-master-model-based-offline-rl-planning",
        name: `Reinforcement Learning — MASTER — Model-Based RL, Offline RL, World Models`,
        description: `- **Model-Based RL**: Learn a dynamics model P(s'|s,a) and use it for planning. Dyna-Q: learn model + do real + simulated rollouts. MuZero: learned model achieves superhuman Go/chess/Atari without knowing rules.
- **Offline RL (Batch RL)**: Learn from a fixed dataset without further interaction. Critical for healthcare, robotics, autonomous driving where online exploration is dangerous. Key algorithms: CQL, IQL, Decision Transformer.
- **Decision Transformer**: Frames RL as sequence modeling. Condition on desired return, output actions. Uses Transformer architecture. Bridges RL and supervised learning.
- **World Models**: Learn a compressed latent model of the environment. DreamerV3: achieves strong performance across diverse domains by learning in "imagination."
- **Monte Carlo Tree Search (MCTS)**: Used in AlphaGo/AlphaZero. Build a search tree guided by policy + value networks. UCB for exploration-exploitation balance.

**Projects:**
- Implement Dyna-Q and compare sample efficiency vs model-free Q-learning.
- Train DreamerV3 on a simple environment and analyze learned world model.
- Implement MCTS for Connect4 with a neural network policy.`,
        resources: [
          { title: `DeepMind — MuZero Paper Explained`, url: "https://www.deepmind.com/blog/muzero-mastering-go-chess-shogi-and-atari-without-rules", type: "article", free: true },
          { title: `Stanford CS234 — Model-Based RL Lectures`, url: "https://www.youtube.com/playlist?list=PLoROMvodv4rOSOPzutgyCTapiGlY2Nd8u", type: "video", free: true },
          { title: `Yannic Kilcher — Decision Transformer Explained`, url: "https://www.youtube.com/watch?v=w4Bw8WYL8Ps", type: "video", free: true },
          { title: `Lilian Weng — World Models Blog`, url: "https://lilianweng.github.io/posts/2019-11-10-self-supervised/", type: "article", free: true },
        ]
      },
    ]
  },
  {
    id: "subject-11",
    label: "GRAPH NEURAL NETWORKS & ADVANCED ARCHITECTURES",
    icon: "🕸️",
    color: "#ec4899",
    colorBg: "rgba(236,72,153,0.12)",
    intro: "Beyond grids and sequences — learn architectures for structured and graph data",
    topics: [
      {
        id: "gnn-beginner-graph-theory-message-passing",
        name: `Graph Neural Networks — BEGINNER — Graph Theory, Message Passing`,
        description: `- **Why Graphs**: Many real-world data are naturally graphs: social networks, molecules, knowledge bases, citation networks. CNNs work on grids, RNNs on sequences — GNNs work on arbitrary graph structures.
- **Graph Fundamentals**: Nodes V, edges E, adjacency matrix A, degree matrix D. Directed vs undirected. Node features X (matrix: N×F). Edge features possible too.
- **Message Passing Framework**: Each node aggregates information from its neighbors. h_v^{k+1} = UPDATE(h_v^k, AGGREGATE({h_u^k : u ∈ N(v)})). Stack K layers = K-hop neighborhood aggregation.
- **GCN (Graph Convolutional Network)**: H^{l+1} = σ(D̃^{-1/2} Ã D̃^{-1/2} H^l W^l). Ã = A + I (add self-loops). Simple, effective, widely used baseline.
- **Tasks**: Node classification (predict label per node), link prediction (predict missing edges), graph classification (predict label per graph).

**Projects:**
- Implement GCN from scratch in PyTorch for Cora citation network classification.
- Visualize message passing on a small graph with networkx.
- Compare GCN vs MLP on node classification — show structure helps.`,
        resources: [
          { title: `Stanford CS224W — Machine Learning with Graphs (Full Course)`, url: "https://www.youtube.com/playlist?list=PLoROMvodv4rPLKxIpqhjhPgdQy7imNkDn", type: "video", free: true },
          { title: `Petar Veličković — Intro to GNNs (Cambridge)`, url: "https://www.youtube.com/watch?v=uF53xsT7mjc", type: "video", free: true },
          { title: `PyTorch Geometric — Getting Started`, url: "https://pytorch-geometric.readthedocs.io/en/latest/get_started/introduction.html", type: "article", free: true },
          { title: `Distill.pub — A Gentle Introduction to GNNs`, url: "https://distill.pub/2021/gnn-intro/", type: "article", free: true },
        ]
      },
      {
        id: "gnn-intermediate-gat-graphsage-heterogeneous",
        name: `Graph Neural Networks — INTERMEDIATE — GAT, GraphSAGE, Heterogeneous Graphs`,
        description: `- **GAT (Graph Attention Networks)**: Use attention weights to determine how much to weight each neighbor's message. Different from GCN's fixed normalization. Attention = softmax(LeakyReLU(a^T [Wh_i || Wh_j])).
- **GraphSAGE**: Samples a fixed number of neighbors (not all) — enables mini-batch training on huge graphs. Aggregators: mean, LSTM, pool. Scales to millions of nodes.
- **Heterogeneous Graphs**: Nodes/edges have different types (e.g., user-item-category). Require type-specific transformations. HGT (Heterogeneous Graph Transformer) handles this.
- **Over-smoothing**: Stacking too many GNN layers makes all node embeddings converge. Mitigations: skip connections, DropEdge, PairNorm, JKNet.
- **Positional Encodings**: GNNs are position-agnostic by default. Adding Laplacian eigenvector PEs or random walk PEs restores positional awareness.

**Projects:**
- Implement GAT for Cora; visualize attention weights on edges.
- Use GraphSAGE on Reddit dataset (large-scale) with PyTorch Geometric mini-batch training.
- Build a heterogeneous GNN for movie recommendation (user-movie-genre graph).`,
        resources: [
          { title: `Stanford CS224W Lecture 6 — GNN Training`, url: "https://www.youtube.com/playlist?list=PLoROMvodv4rPLKxIpqhjhPgdQy7imNkDn", type: "video", free: true },
          { title: `GAT Paper Explained — Yannic Kilcher`, url: "https://www.youtube.com/watch?v=uFLeKkXWq2c", type: "video", free: true },
          { title: `PyG Heterogeneous Graph Tutorial`, url: "https://pytorch-geometric.readthedocs.io/en/latest/tutorial/heterogeneous.html", type: "article", free: true },
        ]
      },
      {
        id: "advanced-arch-beginner-vaes-autoencoders",
        name: `Advanced Architectures — BEGINNER — Autoencoders, VAEs`,
        description: `- **Autoencoder**: Encoder compresses input to latent z, decoder reconstructs. Loss = reconstruction error. Learns compressed representations. Undercomplete (bottleneck smaller than input) forces useful features.
- **Denoising Autoencoder**: Corrupt input with noise, train to reconstruct clean version. Learns more robust features than vanilla AE.
- **Variational Autoencoder (VAE)**: Encoder outputs μ and σ of a Gaussian distribution. Sample z ~ N(μ, σ²) using reparameterization trick. Loss = reconstruction + KL divergence to prior N(0,1). Can generate new samples by sampling from latent space.
- **β-VAE**: Weight the KL term by β > 1 to encourage disentangled latent factors. Each latent dimension captures a separate factor of variation.
- **VQ-VAE**: Discrete latent codes using vector quantization. Basis of modern audio/image generation (used in DALL-E 1, Stable Audio).

**Projects:**
- Implement vanilla autoencoder and VAE on MNIST. Compare reconstructions and latent space.
- Train β-VAE on CelebA faces — show disentangled attributes (smile, hair, glasses).
- Implement VQ-VAE for image compression.`,
        resources: [
          { title: `Arxiv Insights — VAE Explained`, url: "https://www.youtube.com/watch?v=9zKuYvjFFS8", type: "video", free: true },
          { title: `Stanford CS236 — Deep Generative Models`, url: "https://deepgenerativemodels.github.io/", type: "article", free: true },
          { title: `Lilian Weng — From AE to Beta-VAE`, url: "https://lilianweng.github.io/posts/2018-08-12-vae/", type: "article", free: true },
        ]
      },
      {
        id: "advanced-arch-intermediate-gans-contrastive",
        name: `Advanced Architectures — INTERMEDIATE — GANs, Contrastive Learning`,
        description: `- **GAN (Generative Adversarial Network)**: Generator G creates fake samples; Discriminator D classifies real vs fake. Minimax game: min_G max_D E[log D(x)] + E[log(1-D(G(z)))]. Training is notoriously unstable.
- **DCGAN**: Deep Convolutional GAN. Architecture guidelines: use strided convolutions (no pooling), batch norm, ReLU in generator, LeakyReLU in discriminator. Produces realistic images.
- **Wasserstein GAN (WGAN)**: Uses Wasserstein distance instead of JS divergence. More stable training, meaningful loss curve. WGAN-GP adds gradient penalty for Lipschitz constraint.
- **SimCLR (Contrastive Learning)**: Self-supervised learning. Create two augmented views of same image = positive pair. Different images = negative pairs. Train to maximize agreement of positive pairs in embedding space. Needs large batch sizes.
- **DINO/DINOv2**: Self-distillation without labels. Teacher-student setup where teacher is EMA of student. Produces incredibly powerful visual features. Used as foundation for many downstream tasks.

**Projects:**
- Implement DCGAN for CIFAR-10 generation. Track FID score over training.
- Implement SimCLR on STL-10; evaluate linear probe accuracy on learned representations.
- Compare supervised vs self-supervised features on a downstream classification task.`,
        resources: [
          { title: `Ian Goodfellow — GANs Tutorial (NIPS 2016)`, url: "https://www.youtube.com/watch?v=9JpdAg6uMXs", type: "video", free: true },
          { title: `Yannic Kilcher — SimCLR Paper Explained`, url: "https://www.youtube.com/watch?v=FWhM3juUM6s", type: "video", free: true },
          { title: `fast.ai Part 2 — Generative Models Deep Dive`, url: "https://course.fast.ai/Lessons/part2.html", type: "video", free: true },
          { title: `Lilian Weng — Contrastive Representation Learning`, url: "https://lilianweng.github.io/posts/2021-05-31-contrastive/", type: "article", free: true },
        ]
      },
      {
        id: "advanced-arch-advanced-state-space-mamba-mixture-experts",
        name: `Advanced Architectures — ADVANCED — State Space Models, Mamba, Mixture of Experts`,
        description: `- **State Space Models (SSMs)**: Alternative to Transformers for sequence modeling. Linear time complexity O(N) vs O(N²). S4 model uses structured state space with diagonal plus low-rank parameterization. Excellent at very long sequences.
- **Mamba**: Selective State Space Model. Key insight: make SSM parameters input-dependent (selective). Achieves Transformer-quality with linear scaling. Used in Mamba-1, Mamba-2 architectures. Strong at language modeling.
- **Mixture of Experts (MoE)**: Only activate a subset of parameters for each input (sparse activation). Router network selects top-K experts. GPT-4, Mixtral, Switch Transformer use MoE. Enables larger models without proportional compute increase.
- **RetNet / RWKV**: Alternative sequence architectures. Recurrent during inference (constant memory), parallel during training. Potential Transformer replacements for efficiency.
- **Hyena**: Subquadratic attention replacement using long convolutions. H3 (Hungry Hungry Hippos) architecture combines SSM with attention.

**Projects:**
- Study Mamba architecture paper; implement simplified selective scan in PyTorch.
- Compare MoE vs dense model: same parameter count, measure throughput and quality.
- Profile memory usage: Transformer vs Mamba vs RWKV on long sequences.`,
        resources: [
          { title: `Albert Gu — S4/Mamba Lecture (Stanford)`, url: "https://www.youtube.com/watch?v=luCBXCEsdWA", type: "video", free: true },
          { title: `Yannic Kilcher — Mamba Paper Explained`, url: "https://www.youtube.com/watch?v=9dSkvxS2EB0", type: "video", free: true },
          { title: `The Annotated S4 — Interactive Blog`, url: "https://srush.github.io/annotated-s4/", type: "article", free: true },
          { title: `Mixtral MoE — Mistral AI Technical Report`, url: "https://mistral.ai/news/mixtral-of-experts/", type: "article", free: true },
        ]
      },
      {
        id: "advanced-arch-master-neural-ode-energy-geometric",
        name: `Advanced Architectures — MASTER — Neural ODEs, Energy Models, Geometric DL`,
        description: `- **Neural ODEs**: Treat network depth as continuous. Instead of discrete layers, define dynamics dh/dt = f(h, t, θ) and solve with ODE solvers. Constant memory training via adjoint method. Beautiful mathematically.
- **Energy-Based Models (EBMs)**: Learn an energy function E(x). Low energy = high probability. Training: lower energy for real data, raise for fake. Contrastive divergence for training. Yann LeCun's vision for self-supervised AI.
- **Geometric Deep Learning**: Unified framework for CNNs, GNNs, Transformers through symmetry and group theory. All are instances of message passing on different geometric domains. Equivariant networks respect symmetries (rotation, translation).
- **Flow Matching**: Recent generative model training method. Directly regress the velocity field that maps noise to data. Simpler than diffusion, competitive quality. Used in Stable Diffusion 3.
- **Equivariant Neural Networks**: SE(3)-equivariant networks for molecular property prediction. E(n)-equivariant GNNs for 3D molecular generation. Critical for drug discovery and materials science.

**Projects:**
- Implement Neural ODE for time series modeling using torchdiffeq.
- Read and summarize the Geometric Deep Learning blueprint paper.
- Implement simple flow matching for 2D distribution generation.`,
        resources: [
          { title: `Chen et al — Neural ODEs ICML Talk`, url: "https://www.youtube.com/watch?v=V6nGT0Gakyg", type: "video", free: true },
          { title: `Michael Bronstein — Geometric Deep Learning Course`, url: "https://www.youtube.com/playlist?list=PLn2-dEmQeTfSLXW8yXP4q_Ii58wFdxb3C", type: "video", free: true },
          { title: `Yann LeCun — A Path Towards Autonomous Machine Intelligence`, url: "https://openreview.net/pdf?id=BZ5a1r-kVsf", type: "article", free: true },
        ]
      },
    ]
  },
  {
    id: "subject-12",
    label: "MLOPS & PRODUCTION AI",
    icon: "🚀",
    color: "#14b8a6",
    colorBg: "rgba(20,184,166,0.12)",
    intro: "Deploy, monitor, and scale ML models in real-world production systems",
    topics: [
      {
        id: "mlops-beginner-experiment-tracking-reproducibility",
        name: `MLOps — BEGINNER — Experiment Tracking, Reproducibility, Version Control`,
        description: `- **Why MLOps**: A model that works in a notebook is worthless if it can't be deployed, monitored, and maintained. 87% of ML models never reach production. MLOps = DevOps for ML.
- **Experiment Tracking**: Log every run: hyperparameters, metrics, code version, data version. Tools: W&B (Weights & Biases), MLflow, Neptune. Never rely on memory or notebooks for experiment history.
- **Reproducibility**: Set random seeds everywhere (Python, NumPy, PyTorch, CUDA). Pin dependency versions. Use Docker for environment reproducibility. Version your data (DVC).
- **Git for ML**: Track code with Git. Use .gitignore for data/models. Large files: Git LFS or DVC. Branch strategy: main (production), develop (experiments).
- **Configuration Management**: Use Hydra or YAML configs instead of hardcoding hyperparameters. Makes sweeps and ablations trivial.

**Projects:**
- Set up a complete ML project with W&B logging. Run 10 experiments and compare in the W&B dashboard.
- Dockerize a training pipeline. Verify exact reproducibility across machines.
- Set up DVC to version a dataset. Track data changes alongside code changes.`,
        resources: [
          { title: `Made With ML — MLOps Course (Full, Free)`, url: "https://madewithml.com/", type: "article", free: true },
          { title: `ML Engineering for Production (DeepLearning.AI)`, url: "https://www.youtube.com/watch?v=NgWujOrfOR4", type: "video", free: true },
          { title: `W&B — Official Tutorials`, url: "https://www.youtube.com/c/WeightsBiases", type: "video", free: true },
          { title: `DVC — Data Version Control Getting Started`, url: "https://dvc.org/doc/start", type: "article", free: true },
        ]
      },
      {
        id: "mlops-intermediate-serving-fastapi-docker-ci-cd",
        name: `MLOps — INTERMEDIATE — Model Serving, FastAPI, Docker, CI/CD`,
        description: `- **Model Serving**: Wrap trained model in an API endpoint. FastAPI: async Python web framework, automatic docs, Pydantic validation. Flask is simpler but slower.
- **Docker**: Package app + dependencies + model weights into a container. Dockerfile: FROM python:3.11-slim → COPY → RUN pip install → CMD uvicorn. Reproducible anywhere.
- **CI/CD for ML**: GitHub Actions workflow: on push → lint → test → build Docker → push to registry → deploy. Automated quality gates prevent broken models in production.
- **Model Formats**: Save models as .pt (PyTorch), .onnx (framework-agnostic), .pkl (sklearn). ONNX enables cross-framework deployment. TorchScript for production PyTorch.
- **Batch vs Real-time**: Batch inference: process large datasets offline (cheaper). Real-time: serve predictions via API (requires low latency). Choose based on use case.
- **Load Testing**: Use Locust or k6 to simulate concurrent users. Measure p50/p95/p99 latency. Identify bottlenecks before they hit production.

**Projects:**
- Build a FastAPI endpoint that serves a trained CIFAR-10 model. Add input validation and error handling.
- Dockerize the API. Push to Docker Hub. Run on a different machine to prove portability.
- Set up GitHub Actions CI that runs tests and builds Docker image on every push.`,
        resources: [
          { title: `Patrick Loeber — Deploy ML Models with FastAPI`, url: "https://www.youtube.com/watch?v=h5wLuVDr0oc", type: "video", free: true },
          { title: `ML Zoomcamp — Kubernetes Model Deployment`, url: "https://www.youtube.com/watch?v=kx-SeGbkNPU", type: "video", free: true },
          { title: `FastAPI Official Documentation`, url: "https://fastapi.tiangolo.com/", type: "article", free: true },
          { title: `Docker — Getting Started Tutorial`, url: "https://docs.docker.com/get-started/", type: "article", free: true },
        ]
      },
      {
        id: "mlops-advanced-monitoring-drift-ab-testing",
        name: `MLOps — ADVANCED — Monitoring, Data Drift, A/B Testing`,
        description: `- **Model Monitoring**: Track prediction distributions, latency, error rates in production. Sudden changes = something broke. Tools: Evidently AI, WhyLabs, Prometheus + Grafana.
- **Data Drift**: Input data distribution shifts over time (e.g., seasonal changes, new user behaviors). Detect with statistical tests: KS test, PSI (Population Stability Index), Jensen-Shannon divergence.
- **Concept Drift**: The relationship between inputs and outputs changes. Model accuracy degrades even if input distribution is stable. Harder to detect — requires ground truth labels.
- **A/B Testing**: Deploy two model versions simultaneously. Route traffic randomly. Compare metrics with statistical significance tests. Never deploy without A/B testing in production.
- **Feature Stores**: Centralized repository of computed features. Consistent features between training and serving. Tools: Feast (open-source), Tecton, Hopsworks. Prevents training-serving skew.
- **Model Registries**: Track model versions, stage transitions (staging → production → archived). MLflow Model Registry is the standard.

**Projects:**
- Set up Evidently AI monitoring dashboard for a deployed model. Simulate data drift and observe alerts.
- Implement a simple A/B testing framework that splits traffic and computes statistical significance.
- Build a feature store pipeline: compute features during training, serve same features at inference.`,
        resources: [
          { title: `Evidently AI — ML Monitoring Course`, url: "https://www.youtube.com/watch?v=L4Pf0D2SREI", type: "video", free: true },
          { title: `Stanford MLSys Seminar — Production ML`, url: "https://www.youtube.com/playlist?list=PLSrTvUMQPAYX0UgZPk7fKk2vKXIc0cqh", type: "video", free: true },
          { title: `Feast — Open Source Feature Store`, url: "https://feast.dev/", type: "article", free: true },
        ]
      },
      {
        id: "mlops-master-distributed-training-triton-kubernetes",
        name: `MLOps — MASTER — Distributed Training, Triton, Kubernetes Scaling`,
        description: `- **Distributed Data Parallel (DDP)**: Split batch across GPUs. Each GPU computes gradients independently. All-reduce to sync gradients. Linear speedup up to ~8 GPUs. PyTorch: torch.nn.parallel.DistributedDataParallel.
- **FSDP (Fully Sharded Data Parallel)**: Shard model parameters, gradients, AND optimizer states across GPUs. Enables training models larger than single GPU memory. PyTorch FSDP or DeepSpeed ZeRO.
- **Triton Inference Server**: NVIDIA's production serving solution. Supports dynamic batching, model ensembles, multiple frameworks (PyTorch, TensorFlow, ONNX). Used by major tech companies.
- **TensorRT**: NVIDIA's optimizer for inference. Fuses layers, quantizes weights, optimizes for specific GPU architecture. 2-5x speedup over vanilla PyTorch.
- **Kubernetes for ML**: Deploy model serving pods with autoscaling. Horizontal Pod Autoscaler scales based on CPU/GPU utilization or custom metrics (request queue length). KServe/Seldon for ML-specific K8s.
- **Cost Optimization**: Spot/preemptible instances for training (3-5x cheaper). Gradient checkpointing to trade compute for memory. Mixed precision (fp16/bf16) for 2x throughput.

**Projects:**
- Train a ResNet-50 with DDP across 2+ GPUs. Measure scaling efficiency.
- Deploy a model on Triton Inference Server with dynamic batching. Benchmark throughput.
- Set up KServe on a local Kubernetes cluster with auto-scaling inference.`,
        resources: [
          { title: `PyTorch — Distributed Training Tutorial`, url: "https://pytorch.org/tutorials/intermediate/ddp_tutorial.html", type: "article", free: true },
          { title: `Hugging Face — Accelerate Library`, url: "https://huggingface.co/docs/accelerate/", type: "article", free: true },
          { title: `NVIDIA Triton — Getting Started`, url: "https://developer.nvidia.com/triton-inference-server", type: "article", free: true },
          { title: `DeepSpeed — Microsoft Research`, url: "https://www.deepspeed.ai/", type: "article", free: true },
        ]
      },
    ]
  },
];

export const PHASES: Phase[] = [
  {
    id: "phase0",
    num: 0,
    color: "#6b7280",
    duration: "Weeks 1-2",
    weeks: "1-2",
    title: "Phase 0 — Rigorous Baseline Audit",
    objectives: [
      "Benchmark exact calculus, linear algebra, and probability skills.",
      "Identify Python/OOP weaknesses and establish Docker/Conda environment.",
    ],
    weekBreakdown: [
      { label: "Week 1", tasks: ["Attempt a fast Kaggle tabular comp blindly.", "Derivation test: Backprop by hand.", "Setup: Conda/Docker, Jupyter, Git, SSH."] },
      { label: "Week 2", tasks: ["Review an IOAI 2024 task.", "Draft an aggressive strict 14h/week schedule.", "Register Kaggle & HuggingFace hub API keys."] },
    ],
    deliverable: "Fully functional environment, tracked with WandB, and a math gaps assessment.",
  },
  {
    id: "phase1",
    num: 1,
    color: "#5591c7",
    duration: "8 Weeks",
    weeks: "3-10",
    title: "Phase 1 — Math & High-Performance Python",
    objectives: [
      "Attain zero-hesitation fluency in linear algebra (SVD, Eigen) & Vector Calculus.",
      "Master highly vectorized NumPy code avoiding loops entirely.",
      "Implement foundational algorithms entirely from scratch.",
    ],
    weekBreakdown: [
      { label: "Weeks 3-4", tasks: ["SVD and Matrix Subspaces math. Watch 3B1B complete.", "Code vector ops entirely in NumPy C-bindings."] },
      { label: "Weeks 5-6", tasks: ["Information Theory (Cross-Entropy, KL).", "Pandas chunking, arrow-backend for massive CSVs."] },
      { label: "Weeks 7-8", tasks: ["Calculus gradients, Jacobians, Hessians analysis.", "Implement SGD/Momentum from scratch for linear regression."] },
      { label: "Weeks 9-10", tasks: ["Train K-means, Logistic, PCA using only NumPy + Math.", "Submit NumPy-only baseline to UCI/Kaggle dataset."] },
    ],
    deliverable: "Repository of entirely scratch-coded fundamental ML models and their derivations.",
  },
  {
    id: "phase2",
    num: 2,
    color: "#6daa45",
    duration: "12 Weeks",
    weeks: "11-22",
    title: "Phase 2 — Kaggle Tactics & Advanced Classical Modeling",
    objectives: [
      "Attain master-level tree ensembles (XGBoost/LightGBM/CatBoost).",
      "Develop bulletproof cross-validation (GroupKFold, TimeSeries).",
      "Mean Target encoding and complex feature interactions.",
    ],
    weekBreakdown: [
      { label: "Weeks 11-14", tasks: ["SVM Kernels math.", "Imbalanced data tuning handling (F1 macros, Focal loss).", "Study Kaggle Target Encoding pipelines."] },
      { label: "Weeks 15-18", tasks: ["LightGBM/XGBoost full hyperparameter sweeps via Optuna.", "Dimensionality reduction (t-SNE/UMAP).", "Build SHAP/LIME interpretations model cards."] },
      { label: "Weeks 19-22", tasks: ["Scikit-learn Advanced Pipelines, robust imputations.", "Build a stacking/blending pipeline with 5 diverse base models.", "Compete live in Kaggle Tabular Playground (Aim Top 20%)."] },
    ],
    deliverable: "Robust tabular validation and training script featuring LightGBM + Optuna + Stacking.",
  },
  {
    id: "phase3",
    num: 3,
    color: "#a86fdf",
    duration: "16 Weeks",
    weeks: "23-38",
    title: "Phase 3 — PyTorch, Deep Learning, CV & NLP",
    objectives: [
      "Master Neural Networks and Backpropagation mechanics inside out.",
      "Computer Vision baseline models (ResNet/EfficientNet).",
      "Transformers math, self-attention exact mechanism, NLP pipelines.",
    ],
    weekBreakdown: [
      { label: "Weeks 23-26", tasks: ["MLP barebones PyTorch. Overfitting/under-fitting diagnostics.", "Implement Dropout, Batch Norm manually.", "Cosine Annealing with Warmup Restarts scheduling."] },
      { label: "Weeks 27-30", tasks: ["CNNs: ResNet-18 fine-tuning. Image augmentations (Albumentations).", "Capstone: U-Net Segmentation or YOLO object detection task.", "Run Multi-GPU via Accelerate or DDP code."] },
      { label: "Weeks 31-34", tasks: ["Implement self-attention Q/K/V manually without nn.MultiheadAttention.", "Fine-tune BERT via HuggingFace for Text Classification/NER.", "Implement sequence masking correctly."] },
      { label: "Weeks 35-38", tasks: ["Contrastive Learning understanding (SimCLR).", "Audio spectrogram CNNs (Whisper fine-tuning intros)."] },
    ],
    deliverable: "3 end-to-end PyTorch Lightning notebook templates: ResNet CV, BERT NLP, custom MLP.",
  },
  {
    id: "phase4",
    num: 4,
    color: "#fdab43",
    duration: "10 Weeks",
    weeks: "39-48",
    title: "Phase 4 — Ethical Execution, RL & Robustness",
    objectives: [
      "Practice offensive/defensive edge-topics: Bias, Fairness, GenAI.",
      "Understand Reinforcement learning core (MDPs, PPO).",
      "Re-implement official IOAI solutions.",
    ],
    weekBreakdown: [
      { label: "Weeks 39-42", tasks: ["Adversarial attack project (PGD).", "Deep Q-Learning agent build.", "Debrief official IOAI 2024 solutions."] },
      { label: "Weeks 43-46", tasks: ["Mock 8-hour offline challenges. Disable Wifi.", "Strict Baseline Time management drills (<60 mins to submission)."] },
      { label: "Weeks 47-48", tasks: ["Identify top failure modes in evaluation metrics.", "Identify and calculate implicit bias representations in GloVe embeddings."] },
    ],
    deliverable: "Re-built IOAI 2024 tasks demonstrating resilience to adversarial gradients and biased test sets.",
  },
  {
    id: "phase5",
    num: 5,
    color: "#4f98a3",
    duration: "4+ Weeks",
    weeks: "49-52",
    title: "Phase 5 — Contest Polish & Elite Tooling",
    objectives: [
      "Solidify team roles, parallel debugging, split workloads.",
      "Apply Generative AI (RAG, LoRA, Automations) effectively for creative rounds.",
    ],
    weekBreakdown: [
      { label: "Weeks 49-50", tasks: ["Run 3-day full team simulation (Long + Scientific + Practical).", "Refine git merge/Jupyter notebook merge tools (nbdime)."] },
      { label: "Weeks 51-52", tasks: ["Diffusion model & LLM creative prompting/LoRA fine-tuning.", "Final massive math revision check (Equations flashcards)."] },
    ],
    deliverable: "A perfected team execution playbook and a 1-click script to rapidly fine-tune an adapter (LoRA).",
  },
  {
    id: "phase6",
    num: "2+",
    color: "#e84393",
    duration: "Year 2 and Beyond",
    weeks: "53+",
    title: "Phase 6 — Beyond IOAI Foundation (Kaggle Master Tier)",
    objectives: [
      "Attain Kaggle Master status (Top 10% or better finishes consistently).",
      "Read and implement complex research papers from scratch in PyTorch.",
    ],
    weekBreakdown: [
      { label: "Paper Reading", tasks: ["Implement base architectures directly from PDF (ViT, DDPM, GNNs) without looking at official repos.", "Understand Riemannian manifolds for manifold learning."] },
      { label: "Elite Competitive", tasks: ["Deconstruct Kaggle CV & NLP gold-medal solution analyses.", "Implement 3rd degree pseudo-labeling, knowledge distillation, mixup/cutmix pipeline architectures."] },
      { label: "Production MLOps", tasks: ["Deploy models using FastAPI/Triton Inference server.", "Implement low-latency architectures with TensorRT or writing custom CUDA kernels."] },
    ],
    deliverable: "Kaggle Bronze/Silver/Gold medals + Extensive Custom Research Implementation Portfolio.",
  }
];

export const LIVE_RESOURCE_LINKS = [
  { title: "Papers With Code — State-of-the-Art ML Papers", url: "https://paperswithcode.com/latest", category: "Research" },
  { title: "HuggingFace Blog — Daily Open Source Releases", url: "https://huggingface.co/blog", category: "News" },
  { title: "Andrej Karpathy YouTube (Makemore, LLMs)", url: "https://www.youtube.com/@AndrejKarpathy", category: "Tutorial" },
  { title: "StatQuest with Josh Starmer", url: "https://www.youtube.com/@statquest", category: "Tutorial" },
  { title: "DeepLearning.AI: The Batch Newsletter", url: "https://www.deeplearning.ai/the-batch/", category: "News" },
  { title: "Abhishek Thakur (Kaggle Grandmaster Tutorials)", url: "https://www.youtube.com/c/abhishekthakur", category: "Practice" },
  { title: "IOAI Official — Announcements", url: "https://ioai-official.org/", category: "Contest" },
  { title: "Kaggle Competitions — Active Challenges", url: "https://www.kaggle.com/competitions", category: "Practice" },
  { title: "Yannic Kilcher (Paper Breakdown Videos)", url: "https://www.youtube.com/c/YannicKilcher", category: "Research" },
  { title: "Google AI Research Blog", url: "https://ai.googleblog.com/", category: "News" },
  { title: "Arxiv CS.LG — Daily Papers", url: "https://arxiv.org/list/cs.LG/recent", category: "Research" },
  { title: "DeepMind RL Series / OpenAI Spinning Up", url: "https://spinningup.openai.com/", category: "Tutorial" },
  { title: "Lex Fridman AI Interviews", url: "https://www.youtube.com/@lexfridman", category: "Community" },
];
