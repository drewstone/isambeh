pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;


contract Protocol {
	uint numLenders = 0;
	uint numStudents = 0;
	mapping(address => mapping (address => uint)) public pledges;

	struct Student {
		string name;
		string university;
		string major;
		string country;
		bytes32 isaIPFSHash;
		address studentAccount;
		uint128 percentStake;
		uint128 gpa;
		uint128 targetAmt;
		uint verifierIdx; 
		bool tokenized;
		bool verified;
	}
	
	mapping (address => uint) public studentIdxMap;
	Student[] public slist;


	function Protocol() public {
		
		slist.length++;
	}

	function addStudent(string sName, string uni, string maj, string cntry, uint128 gpa;)
		public {
		require(studentIdxMap[msg.sender] == 0);
		studentIdxMap[msg.sender] = slist.length++;

		var sNew = Student({
			name: sName,
			university: uni,
			major: maj,
			studentAccount: msg.sender,
			country: cntry,
			uint128 gpa,
			targetAmt: 0,
			verified: false,
			tokenized: false
		});

		slist[studentIdxMap[msg.sender]] = sNew;
	}

	function setISA(uint128 fundGoal, uint128 percentage, bytes32 IPFSHash) public {
		require(studentIdxMap[msg.sender] > 0);

		slist[studentIdxMap[msg.sender]].isaIPFSHash = IPFSHash;
		slist[studentIdxMap[msg.sender]].targetAmt = fundGoal;
		slist[studentIdxMap[msg.sender]].percentStake = percentage;
	}

	//
	function fund(uint sIdx) public payable {
		require(sIdx > 0);
		require(msg.value >= slist[sIdx].targetAmt);

	}
	
}
