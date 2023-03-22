interface SignalDTO {
  type: String;
  forward: number;
  side: number;
  rear: number;
}

enum TYPE {
  rcs = 'rcs',
  visual = 'visual',
}

export { SignalDTO, TYPE }
